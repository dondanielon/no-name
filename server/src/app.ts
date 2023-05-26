import express, { type Application } from "express";
import http, { type Server } from "http";
import cors from "cors";
import cookies from "cookie-parser";

class ServerApp {
    private app: Application;
    private server: Server;
    private PORT: number;

    constructor(port: number) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.PORT = port;

        // connection to database
        this.databaseConnection();
        // basic middlewares
        this.middlewares();
    }

    run() {
        this.server.listen(this.PORT, () => {
            console.log(`server running on port ${this.PORT}`)
        })
    }

    private async databaseConnection() {
        try {
            // TODO: Make connection to database
        } catch (err) {
            ServerApp.handleInternalError(err)
        }
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

export default ServerApp;