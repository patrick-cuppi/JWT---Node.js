import { Request, Response } from "express";

class AuthController {
    async create(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: "It's Ok"})
    }

    async destroy() {}
}

export default new AuthController