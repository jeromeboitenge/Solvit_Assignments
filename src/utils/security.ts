import * as bcrypt from "bcryptjs"
import { config } from "../config";
import * as jwt from "jsonwebtoken";

export const hashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, 12)

};
export interface generateTokenPayload {
    id: string,
    role: string
}
export const comparePassword = async (
    password: string, db_password: string): Promise<boolean> => {
    return bcrypt.compare(password, db_password)
}

export const generateToken = async ({ id, role }: generateTokenPayload) => {
    return jwt.sign(
        {
            sub: id,
            role,
        },
        config.jwtSecret,
        { expiresIn: "1hr" }
    );
};

export const validateToken = async (token: string) => {
    return

};