import { type Request, type Response, type NextFunction } from "express"
import bcrypt from "bcrypt"
import { User } from "../database/models/User"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import { Social } from "../database/models/Social"
dotenv.config()

interface SignUpRequest {
    username: string
    email: string
    password: string
}

interface SignInRequest {
    email: string
    password: string
}

class AuthController {
    static async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const body: SignUpRequest = req.body
            const encryptedPwd = await bcrypt.hash(body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS!))
            const user = await User.create({
                ...body,
                email: body.email.toLocaleLowerCase(),
                password: encryptedPwd
            })
            await Social.create({ userId: user.id! })
            return res.sendStatus(201)
        } catch (err) {
           return next(err) 
        }
    }

    static async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: SignInRequest  = req.body

            const user = await User.findOne({ where: { email: email.toLocaleLowerCase() }})
            if (!user) return res.sendStatus(401)

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) return res.sendStatus(401)

            const tokenAttributes = {
                id: user.id!,
                username: user.username,
                email: user.email
            }
            const accessToken = jwt.sign(tokenAttributes, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "60m" })
            const refreshToken = jwt.sign(tokenAttributes, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "30d"})

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "none"
            })

            return res.status(200).json({
                ...tokenAttributes,
                accessToken
            })
        } catch (err) {
            return next(err)
        }
    }

    static async signout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            if(!refreshToken) return res.sendStatus(400)

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.sendStatus(200)
        } catch (err) {
            return next(err)
        }
    }

    static async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            if(!refreshToken) return res.sendStatus(401)

            jwt.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET!, 
                (err: unknown, decoded: any) => {
                    if (err) return res.sendStatus(403) // Once error handler is complete, handle this error
                    return res.status(200).json(decoded)
                }
            )
        } catch (err) {
            return next(err)
        }
    }
}

export default AuthController