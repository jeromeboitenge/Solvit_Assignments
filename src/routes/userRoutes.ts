import { Router } from "express";
import {
    createUserController,
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController
} from "../controllers/user.controller";
import { validate } from "../middlewares/user.middleware";
import { userValidationSchema } from "../schema/user/user.validation";

const userRouter = Router();

userRouter.post("/user", validate(userValidationSchema), createUserController);
userRouter.get("/user", getUsersController);
userRouter.get("/user/:id", getUserController);
userRouter.put("/user/:id", validate(userValidationSchema), updateUserController);
userRouter.delete("/user:id", deleteUserController);

export { userRouter };