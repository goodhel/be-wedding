import mysql from "../helpers/database";
import Joi from "joi"

interface Greeting {
    wedding_id: number
    name: string
    address: string
    phone: string
    note: string
}

interface ListGreeting {
    wedding_id: number
}

class _greeting {
    addGreeting = async (body: Greeting) => {
        try {
            const schema = Joi.object({
              wedding_id: Joi.number().required(),
              name: Joi.string().required(),
              address: Joi.string().required(),
              phone: Joi.string().required(),
              note: Joi.string().required()
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

            const greeting = await mysql.query(
                'INSERT INTO mst_greeting (wedding_id, name, address, phone, note) VALUES (?,?,?,?,?)',
                [body.wedding_id, body.name, body.address, body.phone, body.note]
            )

            return {
                status: true,
                data: greeting
            }
        } catch (error) {
            console.error('userGreeting greeting module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listGreetingGuest = async (body: ListGreeting) => {
        try {
            const schema = Joi.object({
              wedding_id: Joi.number().required(),
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

            const list = await mysql.query(
                'SELECT name, note FROM mst_greeting WHERE wedding_id = ?',
                [body.wedding_id]
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listGreetingGuest greeting module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listGreeting = async (body: ListGreeting) => {
        try {
            const schema = Joi.object({
              wedding_id: Joi.number().required(),
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

            const list = await mysql.query(
                'SELECT id, name, address, phone, note FROM mst_greeting WHERE wedding_id = ?',
                [body.wedding_id]
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listGreeting greeting module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteGreeting = async (id: number) => {
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

            const check = await mysql.query('SELECT id, name FROM mst_greeting WHERE id = ?', [id])

            if (check.code === 'EMPTY_RESULT') {
                return {
                    status: false,
                    code: 404,
                    error: 'Sorry, greeting not found'
                  }
            }

            const del = await mysql.query(
                'DELETE FROM mst_greeting WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteGreeting greeting module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

export default new _greeting()