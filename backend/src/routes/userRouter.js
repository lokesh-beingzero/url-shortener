// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { privateRoute } from '../middlewares/authMiddleware.js';
import { getUserDetails } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/me', privateRoute, getUserDetails);

export default userRouter;