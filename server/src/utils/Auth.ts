import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

interface IRequest extends Request {
    user?: any;
}

class Auth {
    public static createAccessToken(user: object): string {
        try {
            const expiresIn: string =
                (process.env.ACCESS_TOKEN_EXPIRE_MINUTES as string) + 'm';
            const token = sign(
                { user },
                process.env.ACCESS_TOKEN_SECRET as string,
                {
                    expiresIn,
                    algorithm: 'HS256',
                }
            );
            return token;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static createRefreshToken(user: object): string {
        try {
            const expiresIn: string =
                (process.env.REFRESH_TOKEN_EXPIRE_MINUTES as string) + 'm';
            const token = sign(
                { user },
                process.env.REFRESH_TOKEN_SECRET as string,
                {
                    expiresIn,
                    algorithm: 'HS256',
                }
            );
            return token;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static decodeAccessToken(token: string): object {
        try {
            return verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as object;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static decodeRefreshToken(token: string): object {
        try {
            return verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as string
            ) as object;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public static async isAuthenticated(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        console.log(process.env.ACCESS_TOKEN_EXPIRE_MINUTES);
        let token: string =
            (req.headers.authorization as string) ||
            (req.headers.Authorization as string) ||
            '';

        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        console.log('token: ', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: 'Unauthorizex',
            });
        }

        try {
            const decoded: any = Auth.decodeAccessToken(token);

            // decoded have user and user have email, if not then return error
            if (!decoded.user || !decoded.user.email) {
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: 'Unauthorized',
                });
            }

            // add user to request
            req.user = decoded.user;
            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: error.message,
            });
        }
    }
}

export default Auth;
