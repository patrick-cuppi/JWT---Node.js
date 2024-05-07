import { Request, Response } from "express";

class UsersController {
    async index(_req: Request, res: Response): Promise<Response> {
        const users = [
            { id: '456', email: 'testing@example.com' }
        ]

        return res.status(200).json(users)
    }
}

export default new UsersController()