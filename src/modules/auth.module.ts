import mysql from "../helpers/database";
import Joi from "joi"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dayjs from "dayjs"
import config from '../config/app.config.json'

interface Auth {
    email: string
    password: string
}

class _auth {
    register = async (body: Auth) => {
        try {
            const schema = Joi.object({
              email: Joi.string().required(),
              password: Joi.string().required()
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

            const password = bcrypt.hashSync(body.password, 10)

            const reg = await mysql.query(
                'INSERT INTO auth_user (email, password) VALUES (?,?)',
                [body.email, password]
            )

            await mysql.query(
                'INSERT INTO auth_user_role (user_id, role_id) VALUES (?,?)',
                [reg.insertId, 1]
            )

            return {
                status: true,
                code: 201,
                data: reg
            }
        } catch (error) {
            console.error('register auth module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    login = async (body: Auth) => {
        try {
            const schema = Joi.object({
              email: Joi.string().required(),
              password: Joi.string().required()
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

            const { secret, expired } = config.jwt

            const user = await mysql.query(
                'SELECT id, email, password FROM auth_user WHERE email = ?',
                [body.email]
            )

            if (user.code === 'EMPTY_RESULT') {
                return {
                  status: false,
                  code: 404,
                  error: 'Sorry, user not found'
                }
            }

            if (!bcrypt.compareSync(body.password, user[0].password)) {
                return {
                    status: false,
                    code: 401,
                    error: 'Wrong password'
                }
            }

            const expiresAt = dayjs(new Date(Date.now() + expired)).format('YYYY-MM-DD HH:mm:ss')

            const payload = {
                i: user[0].id,
                e: user[0].email,
                t: expiresAt
            }

            const token = jwt.sign(payload, secret, { expiresIn: String(expired) })

            return {
                status: true,
                data: {
                    token,
                    expiresAt
                }
            }
        } catch (error) {
            console.error('login auth module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

export default new _auth()