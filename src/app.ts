import express, { Application } from "express";

export default class App {
    app: Application

    constructor() {
        this.app = express();

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}.`)
        })
    }

    private middlewares() {}

    private routes() {}

    private exceptionHandler() {}
}