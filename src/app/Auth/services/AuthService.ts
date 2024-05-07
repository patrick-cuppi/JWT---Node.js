export default class AuthService {
    async signIn(email: string, password: string): Promise<void> {
        const user = {
            id: '123',
            email: 'example@email.com',
            password: '123abc',
            fullname: 'Admin',
        }

        if(email !== user.email || password !== user.password) {
            throw new Error ('Invalid credentials!')
        }
    }
}