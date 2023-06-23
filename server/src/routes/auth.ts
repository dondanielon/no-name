import { Router } from "express"
import AuthController from "../controllers/auth"

export const auth = Router()

auth.post("/signup", AuthController.signup)
auth.post("/signin", AuthController.signin)