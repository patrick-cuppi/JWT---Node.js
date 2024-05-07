import { Router } from "express";
import authRoutes from "@app/Auth/routes";
import users from "@app/Users/routes"

const routes = Router()

routes.use(authRoutes)
routes.use(users)

export default routes