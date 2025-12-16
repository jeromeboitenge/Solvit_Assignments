import { generateToken } from "../utils/security";

export class AuthService {
    async loginService(user: { id: string, role: string }): Promise<string> {
        return generateToken({ id: user.id, role: user.role })

    }
}