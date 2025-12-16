import { Request, Response } from "express";
import { UsersServices } from "../services/users.service";
import { CreateUsersInterface } from "../types";
import { ResponseService } from "../utils";
import { hashedPassword } from "../utils/security";

const usersServices = new UsersServices();
const responseServices = new ResponseService();

export class UserController {
    // Arrow function preserves 'this' context
    public createUser = async (req: CreateUsersInterface, res: Response): Promise<void> => {
        try {
            const { email, name, gender, isActive, password } = req.body;

            const userExist = await usersServices.userExists(email);
            if (userExist) {
                responseServices.response({
                    res,
                    message: "User already exists",
                    statusCode: 400
                });
                return;
            }

            const newUser = await usersServices.createUser({
                email,
                name,
                gender,
                isActive,
                password: hashedPassword(password),
                role: "user"
            });

            responseServices.response({
                res,
                statusCode: 201,
                message: "User created successfully",
                success: true,
                data: newUser
            });
        } catch (err) {
            const { message, stack } = err as Error;
            responseServices.response({
                res,
                statusCode: 500,
                message,
                data: stack
            });
        }
    };

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await usersServices.getAllUsers();
            responseServices.response({
                res,
                message: "All users",
                success: true,
                data: users
            });
        } catch (err) {
            const { message, stack } = err as Error;
            responseServices.response({
                res,
                statusCode: 500,
                message,
                data: stack
            });
        }
    };
}
