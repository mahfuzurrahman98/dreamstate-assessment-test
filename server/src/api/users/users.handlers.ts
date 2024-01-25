import { Request, Response } from 'express';
import userModel from './users.model';

interface CreateUserRequestBody {
    name: string;
    email: string;
    password: string;
}

const usersHandlers = {
    create: async (
        req: Request<{}, {}, CreateUserRequestBody>,
        res: Response
    ): Promise<void> => {
        try {
            // get data from request body
            const { name, email, password } = req.body;

            // validate data
            if (!name) {
                res.status(422).json({
                    success: false,
                    message: 'name is required',
                });
            }
            if (!email) {
                res.status(422).json({
                    success: false,
                    message: 'email is required',
                });
            }
            if (!password) {
                res.status(422).json({
                    success: false,
                    message: 'password is required',
                });
            }

            // check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                res.status(409).json({
                    success: false,
                    message: 'user already exists',
                });
                return;
            }

            // create new user
            const user = await userModel.create({
                name,
                email,
                password,
                google_auth: false,
                active: true,
            });

            res.status(201).json({
                success: true,
                message: 'user created successfully',
                // data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'internal server error',
            });
        }
    },
};

export default usersHandlers;
