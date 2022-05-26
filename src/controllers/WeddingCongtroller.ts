import { NextFunction, Request, Response, Router } from "express";
import response from "../helpers/response";
import m$wedding from "../modules/wedding.module";

export const WeddingController = Router()

/**
 * List Wedding 
 */
WeddingController.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    const list = await m$wedding.listWedding()

    response.sendResponse(res, list)
})

/**
 * Add Wedding 
 * @param {string} name
 * @param {string} men_name
 * @param {string} women_name
 */
WeddingController.post('/', async (req: Request, res: Response, _next: NextFunction) => {
    const add = await m$wedding.addWedding(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Wedding 
 * @param {number} id
 * @param {string} name
 * @param {string} men_name
 * @param {string} women_name
 */
WeddingController.put('/', async (req: Request, res: Response, _next: NextFunction) => {
    const edit = await m$wedding.editWedding(req.body)

    response.sendResponse(res, edit)
})

/**
 * Delete Wedding
 * @param {number} id
 */
WeddingController.delete('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const del = await m$wedding.deleteWedding(+req.params.id)

    response.sendResponse(res, del)
})