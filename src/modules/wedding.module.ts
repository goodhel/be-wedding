import mysql from "../helpers/database";
import Joi from "joi"

interface Wedding {
    id?: number
    name: string
    men_name: string
    women_name: string
}

class _wedding {
    listWedding = async () => {
        try {
            const list = await mysql.query(
                'SELECT id, name, men_name, women_name FROM mst_wedding',
                []
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listWedding wedding module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    addWedding = async (body: Wedding) => {
        try {
            const schema = Joi.object({
              name: Joi.string().required(),
              men_name: Joi.string().required(),
              women_name: Joi.string().required()
            }).options({ abortEarly: false })
      
            const validation = schema.validate(body)
      
            if (validation.error) {
              const errorDetails = validation.error.details.map((detail) => detail.message)
      
              return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
              }
            }

            const add = await mysql.query(
                'INSERT INTO mst_wedding (name, men_name, women_name) VALUES (?,?,?)',
                [body.name, body.men_name, body.women_name]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addWedding wedding module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    editWedding = async (body: Required<Wedding>) => {
        try {
            const schema = Joi.object({
              id: Joi.number().required(),
              name: Joi.string().required(),
              men_name: Joi.string().required(),
              women_name: Joi.string().required()
            }).options({ abortEarly: false })
      
            const validation = schema.validate(body)
      
            if (validation.error) {
              const errorDetails = validation.error.details.map((detail) => detail.message)
      
              return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
              }
            }

            const check = await mysql.query(
                'SELECT id, name FROM mst_wedding WHERE id = ?',
                [body.id]
            )

            if (check.code === 'EMPTY_RESULT') {
                return {
                  status: false,
                  code: 404,
                  error: 'Sorry, wedding not found'
                }
            }

            const update = await mysql.query(
                'UPDATE mst_wedding SET name = ?, men_name = ?, women_name = ? WHERE id = ?',
                [body.name, body.men_name, body.women_name, body.id]
            )

            return {
                status: true,
                data: update
            }
        } catch (error) {
            console.error('editWedding wedding module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteWedding = async (id: number) => {
        try {
            const body = { id }

            const schema = Joi.object({
              id: Joi.number().required(),
            }).options({ abortEarly: false })
      
            const validation = schema.validate(body)
      
            if (validation.error) {
              const errorDetails = validation.error.details.map((detail) => detail.message)
      
              return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
              }
            }

            const check = await mysql.query(
                'SELECT id, name FROM mst_wedding WHERE id = ?',
                [id]
            )

            if (check.code === 'EMPTY_RESULT') {
                return {
                  status: false,
                  code: 404,
                  error: 'Sorry, wedding not found'
                }
            }

            const del = await mysql.query(
                'DELETE FROM mst_wedding WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteWedding wedding module Error: ', error)

            return {
                status: false,
                error
            }
        }
    } 
}

export default new _wedding()
