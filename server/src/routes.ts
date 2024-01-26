import { Request, Response, Router } from 'express';
import usersHandlers from './api/users/users.handlers';
import Auth from './utils/Auth';

const router = Router();
const authMiddleware = Auth.isAuthenticated;

// home rotue
router.get('/', authMiddleware, (req: Request, res: Response) => {
    try {
        /**
         * The path to the image file.
         */
        const image = '/images/ai.png';
        res.status(200).json({
            success: true,
            message: 'Hello World!',
            data: {
                image,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        });
    }
});

// users routes
router.get('/users', usersHandlers.getAll); // get all users

router.post('/users', usersHandlers.create); // create new user
router.post('/users/login', usersHandlers.login); // login user
router.post('/users/refresh-token', usersHandlers.refreshToken); // refresh token
router.post('/users/logout', usersHandlers.logout); // logout user

export default router;
