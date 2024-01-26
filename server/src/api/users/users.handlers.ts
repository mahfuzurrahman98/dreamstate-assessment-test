import axios from 'axios';
import { Request, Response } from 'express';
import { IUser } from '../../interfaces/user';
import Auth from '../../utils/Auth';
import Hash from '../../utils/Hash';
import userModel from './users.model';

interface CreateUserRequestBody {
    name: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

interface GoogleLoginRequestBody {
    code: string;
}

const usersHandlers = {
    // get all users
    // it will return a response with all users
    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const users = await userModel.find();
            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Something went wrong',
            });
        }
    },

    // create new user
    create: async (
        req: Request<{}, {}, CreateUserRequestBody>,
        res: Response
    ): Promise<Response> => {
        try {
            // get data from request body
            const { name, email, password } = req.body;

            // validate data
            if (!name) {
                return res.status(422).json({
                    success: false,
                    message: 'Name is required',
                });
            }
            if (!email) {
                return res.status(422).json({
                    success: false,
                    message: 'Email is required',
                });
            }
            if (!password) {
                return res.status(422).json({
                    success: false,
                    message: 'Password is required',
                });
            }

            // check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'The email address is already in use',
                });
            }

            // create new user
            // hash password
            const hashedPassword = await Hash.make(password);
            const user: IUser = await userModel.create({
                name,
                email,
                password: hashedPassword,
                google_auth: false,
                active: true,
            });

            // remove password from response
            user.password = undefined;

            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: { user },
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Something went wrong',
            });
        }
    },

    // login
    login: async (
        req: Request<{}, {}, LoginRequestBody>,
        res: Response
    ): Promise<Response> => {
        try {
            // get data from request body
            const { email, password } = req.body;

            // validate data
            if (!email) {
                return res.status(422).json({
                    success: false,
                    message: 'Email is required',
                });
            }
            if (!password) {
                return res.status(422).json({
                    success: false,
                    message: 'Password is required',
                });
            }

            // check if user exists
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // check if password is correct

            const isPasswordCorrect = await Hash.check(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            // create access token, and refresh token
            const accessToken = Auth.createAccessToken({
                email: user.email,
            });
            const refreshToken = Auth.createRefreshToken({
                email: user.email,
            });

            // set referesh token in the response cookie
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: {
                    accessToken,
                },
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Something went wrong',
            });
        }
    },

    // login through google oauth
    googleOAuthLogin: async (
        req: Request<{}, {}, GoogleLoginRequestBody>,
        res: Response
    ): Promise<Response> => {
        try {
            const { code } = req.body;

            const data = {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID as string,
                client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
                grant_type: 'authorization_code' as string,
            };

            const response = await axios.post(
                'https://oauth2.googleapis.com/token',
                new URLSearchParams(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            if (response.status === 200) {
                const access_token = response.data.access_token;

                const userinfo_response = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${access_token}` } }
                );

                if (userinfo_response.status === 200) {
                    const userinfo = userinfo_response.data;

                    let response_message = 'Login successful';

                    try {
                        const existingUser = await userModel.findOne({
                            email: userinfo.email,
                            google_auth: true,
                        });

                        if (!existingUser) {
                            const newUser = await userModel.create({
                                name: userinfo.name,
                                username: userinfo.given_name,
                                email: userinfo.email,
                                google_auth: true,
                            });

                            response_message = 'Welcome to Codeglimpse!';
                        }

                        const user = await userModel.findOne({
                            email: userinfo.email,
                            google_auth: true,
                        });

                        if (!user) {
                            throw new Error('User not found after creation');
                        }

                        // TODO: Implement token creation logic here
                        // const access_token = ...;
                        // const refresh_token = ...;
                        // TODO: Implement setting cookies logic here
                        // res.cookie('refresh_token', refresh_token, { maxAge: max_age_seconds, path: '/', secure: false, httpOnly: true, sameSite: 'strict' });

                        return res.status(200).json({
                            message: response_message,
                            data: {
                                user,
                                access_token,
                            },
                        });
                    } catch (error: any) {
                        return res.status(500).json({
                            success: false,
                            message: `${error.message} - Error from user creation or retrieval`,
                        });
                    }
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Failed to fetch user info',
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Google OAuth login failed',
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || 'Internal server error',
            });
        }
    },

    // refresh access token
    refreshToken: async (req: Request, res: Response): Promise<Response> => {
        const token = req.cookies.refresh_token;
        console.log('refreh: ', token);
        if (!token) {
            res.setHeader('WWW-Authenticate', 'Bearer');
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }

        try {
            const decoded: any = Auth.decodeRefreshToken(token);
            console.log(decoded);
            // email should be present in payload
            if (!decoded.user || !decoded.user.email) {
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: 'Unauthorized',
                });
            }
            const email = decoded.user.email;

            const user: IUser | null = await userModel.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            try {
                const accessToken = Auth.createAccessToken({
                    email: user.email,
                });
                user.password = undefined;
                user.deletedAt = undefined;
                user.__v = undefined;
                // set WWW-Authenticate to Bearer in response header
                res.setHeader('WWW-Authenticate', 'Bearer');

                return res.status(200).json({
                    message: 'Authentication successful',
                    data: { user, accessToken },
                });
            } catch (error: any) {
                throw new Error(error);
            }
        } catch (eror: any) {
            return res.status(500).json({
                success: false,
                message: eror.message || 'Internal server error',
            });
        }
    },

    // logout
    logout: async (req: Request, res: Response): Promise<Response> => {
        res.clearCookie('refresh_token');
        return res.status(204);
    },
};

export default usersHandlers;
