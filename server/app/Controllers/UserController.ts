import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../../interfaces/user';
import { User } from '../Models/User';
import { UserService } from '../Services/USerService';

export class UserController {
    private model: Model<IUser>;
    // service is a class
    private service: UserService;

    constructor() {
        this.model = new User().getModel();
        this.service = new UserService();
    }

    public async index(req: Request, res: Response): Promise<Response | null> {
        try {
            const users = await this.service.index(req, res);

            if (users && users.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No users found',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users,
            });
        } catch (error: any) {
            console.log(error.stack);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // public static async show(req: Request, res: Response): Promise<Response> {
    //     const user = await this.model.findOne(req.params.id);
    //     return res.json(user);
    // }

    // public static async store(req: Request, res: Response): Promise<Response> {
    //     const user = await this.model.create(req.body);
    //     return res.json(user);
    // }

    // public static async update(req: Request, res: Response): Promise<Response> {
    //     const user = await this.model.update(req.params.id, req.body);
    //     return res.json(user);
    // }

    // public static async destroy(
    //     req: Request,
    //     res: Response
    // ): Promise<Response> {
    //     const user = await this.model.delete(req.params.id);
    //     return res.json(user);
    // }
}
