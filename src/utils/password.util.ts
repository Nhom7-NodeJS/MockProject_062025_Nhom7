import bcrypt from "bcryptjs"

export class PasswordUtils {
    async hashPassword(password : string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
    async comparePassword(password: string, hashPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, hashPassword);
    }
}