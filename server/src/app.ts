import express, { type Application } from "express"
import http, { type Server } from "http"
import cors from "cors"
import cookies from "cookie-parser"
import { type Sequelize } from "sequelize"
const { sequelize } = require("./database/config.js")

class ServerApp {
    private app: Application
    private server: Server
    private PORT: number
    private sequelize: Sequelize

    constructor(port: number) {
        this.app = express()
        this.server = http.createServer(this.app)
        this.PORT = port
        this.sequelize = sequelize

        this.middlewares()
    }

    run() {
        this.sequelize
            .sync({ force: true })
            .then(() => {
                this.server.listen(this.PORT, () => {
                    console.log(`server running on port ${this.PORT}`)
                })
            })
            .catch((err: unknown) => {
                ServerApp.handleInternalError(err)
            })
    }

    private middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(cookies())
    }

    private static handleInternalError(err: unknown) {
        //TODO: handle errors for application
        console.log(err)
    }
}

export default ServerApp
