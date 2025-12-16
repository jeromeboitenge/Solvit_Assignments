import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../../utils";
import jwt from 'jsonwebtoken'
import { config } from "../../config";
import { AuthRequest, JwtPayload } from "../../types";
const responseService = new ResponseService()

export class AuthMiddleware {
    tokenvalidation(req: AuthRequest, res: Response, next: NextFunction): Response {

        const authHeader: string | undefined = req.headers['authorization'];
        const token: string | undefined = authHeader?.split(' ')[1];

        if (!token)
            return responseService.response({
                res,
                statusCode: 401,
                message: "Un authorized access",
            });

        const payload = jwt.verify(token, config.jwtSecret);
        if (!payload)
            return responseService.response({
                res,
                statusCode: 401,
                message: " Un authorized access"
            })

        req.user = payload as JwtPayload;
        next();

    }


}