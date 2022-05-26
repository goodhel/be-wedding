import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$auth from "../modules/auth.module";

export const AuthController = Router()

AuthController.post("/login", async (req: Request, res: Response, _next: NextFunction) => {
    const login = await m$auth.login(req.body)

    response.sendResponse(res, login)
})

AuthController.post("/register", async (req: Request, res: Response, _next: NextFunction) => {
    const register = await m$auth.register(req.body)

    response.sendResponse(res, register)
})