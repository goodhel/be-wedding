import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$greeting from "../modules/greeting.module";

export const GreetingController = Router()

interface Query {
    wedding_id: number
}

/**
 * List Wedding Greeting Admin
 * @param {number} wedding_id
 */
GreetingController.get('/', async (req: Request<{}, {}, {}, Query>, res: Response, _next: NextFunction) => {
    const list = await m$greeting.listGreeting({wedding_id: req.query.wedding_id})

    response.sendResponse(res, list)
})

/**
 * List Wedding Greeting Guest
 * @param {number} wedding_id
 */
GreetingController.get('/guest', async (req: Request<{}, {}, {}, Query>, res: Response, _next: NextFunction) => {
    const list = await m$greeting.listGreetingGuest({wedding_id: req.query.wedding_id})

    response.sendResponse(res, list)
})

/**
 * Add Greeting
 * @param {number} wedding_id
 * @param {string} name
 * @param {string} phone
 * @param {string} address
 * @param {string} note
 */
GreetingController.post('/add', async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$greeting.addGreeting(req.body)

    response.sendResponse(res, list)
})

/**
 * Delete Greeting
 * @param {number} id
 */
GreetingController.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const del = await m$greeting.deleteGreeting(+req.params.id)

    response.sendResponse(res, del)
})