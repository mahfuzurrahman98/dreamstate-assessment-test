import { Request, Response, Router } from 'express';
import usersHandlers from './api/users/users.handlers';
const router = Router();

// home rotue
router.get('/', (req: Request, res: Response) => {
    // image is basicallty stored in public folder, file name ai.png
    const image = '/images/ai.png';
    res.status(200).json({
        success: true,
        message: 'Hello World!',
        data: {
            image,
        },
    });
});

// users routes
router.get('/users', () => {}); // get all users
router.get('/users/:id', () => {}); // get user by id
router.post('/users', usersHandlers.create); // create user
router.put('/users/:id', () => {}); // update user by id
router.delete('/users/:id', () => {}); // delete user by id
router.post('/users/login', () => {}); // login user
router.post('/users/logout', () => {}); // logout user

export default router;
