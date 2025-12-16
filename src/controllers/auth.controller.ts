import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UsersServices } from "../services/users.service";
import { ResponseService } from "../utils";
import { loginInterface } from "../types/auth.interface";
import { comparePassword } from "../utils/security";

const responseService = new ResponseService()
const authService = new AuthService()
const userService = new UsersServices
export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const body = req.body as loginInterface
            const exist = await userService.userExists(body.email)

            if (!exist) {
                return responseService.response({
                    res,
                    statusCode: 404,
                    message: "user does not exist",

                })

            }
            const user = await userService.getUser(req.body)
            const passwordMatch = await comparePassword(body.password, user?.password as string)
            if (!passwordMatch) {
                return responseService.response({
                    res,
                    statusCode: 400,
                    message: "Incorrect Email or Password"
                })
            }
            const token = await authService.loginService({
                id: user?.id.toString() as string,
                role: user?.role ?? ("User" as string)
            })
            return responseService.response({
                res,
                message: "User Login sucessful",
                statusCode: 200,
                data: token
            })

        } catch (error) {
            const { message, stack } = error as Error
            return responseService.response({
                res,
                statusCode: 500,
                data: stack,
                message,
            })
        }

    }
}


