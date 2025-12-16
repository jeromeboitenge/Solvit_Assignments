import { Request } from "express";

export interface loginInterface {
    email: string,
    password: string
}

export interface AuthRequest extends Request {
    user: JwtPayload
}
export interface JwtPayload {
    id: string,
    role: string
}