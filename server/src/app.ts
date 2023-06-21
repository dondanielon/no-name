import express, { type NextFunction, type Request, type Response } from "express"
import bodyParser from "body-parser"
import http from "http"
import cors from "cors"
import cookies from "cookie-parser"
import { auth } from "./routes/auth"
// TODO: handle different errors
function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.log(err)
    return res.status(500).json({errMessage: err.message})
}

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: "5mb"}))
app.use(cors())
app.use(cookies())

// routes
app.use("/auth", auth)
// endware error handler
app.use(errorHandler)

export const server = http.createServer(app)