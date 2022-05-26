import { Application, Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { GreetingController } from "./controllers/GreetingController";
import { WeddingController } from "./controllers/WeddingCongtroller";

const _routes: [string, Router][] = [
    ["", AuthController],
    ["/wedding", WeddingController],
    ["/greeting", GreetingController],
]

const routes = (app: Application) => {
    _routes.forEach((router) => {
        const [url, controller] = router
        app.use(url, controller)
    })
}

export default routes