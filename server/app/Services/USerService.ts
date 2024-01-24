import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../../interfaces/user';
import { User } from '../Models/User';

export class UserService {
    private model: Model<IUser>;

    constructor() {
        this.model = new User().getModel();
    }

    public async index(req: Request, res: Response): Promise<IUser[] | null> {
        // return all user
        try {
            const users = await this.model.find();
            return users;
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
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
