import { Request } from "express";
export interface UserInterface {
    email: string;
    name: string;
    gender: "male" | "female" | "other";
    password: string;
    isActive: boolean;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateUsersInterface extends Request {
    // <Omit<UserInterface, 'createAt'>>
    body: UserInterface;
}
