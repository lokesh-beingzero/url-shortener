import { Router } from "express";
import { privateRoute } from "../middlewares/authMiddleware.js";
import { createShortURL } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post('/', privateRoute, createShortURL);

export default shortURLRouter;
