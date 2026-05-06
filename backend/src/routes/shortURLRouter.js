import { Router } from "express";
import { privateRoute } from "../middlewares/authMiddleware.js";
import { createShortURL, getAndRedirectURL } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post('/', privateRoute, createShortURL);

shortURLRouter.get('/:shortCode', privateRoute, getAndRedirectURL);

export default shortURLRouter;
