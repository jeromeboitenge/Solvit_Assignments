import express, { NextFunction, Request, Response, Router } from "express";

import { LoginValidation } from "../schema/user/usersValidation";
import { Type, validationMiddleware } from "../middlewares/users";
import { AuthController } from "../controllers/auth.controller";
const authController = new AuthController();
const authRoute: Router = express.Router();
authRoute.post(
    "/auth/login",
    validationMiddleware({
        schema: LoginValidation,
        type: Type["BODY"],
    }),

    authController.login
);

export { authRoute };
