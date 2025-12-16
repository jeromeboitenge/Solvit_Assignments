import { Type, validationMiddleware } from "../middlewares/users";
import { UserSchemaValidation } from "../schema/user/usersValidation";
import express, { Router } from "express";
import { UserController } from "../controllers";

const userRoute: Router = express.Router();
const userController = new UserController();
userRoute.post(
    "/users",
    validationMiddleware({
        schema: UserSchemaValidation,
        type: Type.BODY,
    }),
    userController.createUser
);
userRoute.get("/users", userController.getAllUsers);

export { userRoute };
