import jwt from "jsonwebtoken";
import AuthError from "@app/Auth/exceptions/AuthError";
import config from "@/config"
import { getValue, setValue } from "@/lib/redis";

export default class AuthService {
    async signIn(email: string, password: string): Promise<{ user: object; token: string }> {
        const user = {
            id: '123',
            email: 'example@email.com',
            password: '123abc',
            fullName: 'Admin',
        }

        if(email !== user.email || password !== user.password) {
            throw new AuthError ('Invalid credentials!')
        }

        const { id, fullName } = user 

        const token = jwt.sign({ id }, config.auth.secret, {
            expiresIn: config.auth.expiresIn,
        })

        return {
            user: {
                id,
                fullName,
                email,
            },
            token,
        }
    }

    async signOut(token: string): Promise<void> {
        await this.blackListToken(token)
    }

    async validateToken(token: string): Promise<string> {
        try {
            if(await this.isTokenBlackListed(token)) 
                throw new AuthError('Token was blacklisted')

            const decoded = jwt.verify(token, config.auth.secret) as {
                id: string
            }

            return decoded.id
        } catch (error) {
            throw new AuthError('Invalid token')
        }
    }

    private async isTokenBlackListed(token: string): Promise<boolean> {
        const blackListedToken = await getValue(`tokens:invalidated:${token}`)

        return !!blackListedToken
    }

    private async blackListToken(token: string): Promise<void> {
        await setValue(`tokens:invalidated:${token}`, true)
    }
}