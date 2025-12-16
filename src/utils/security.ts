import * as bcrypt from "bcryptjs"

export const hashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, 12)

};