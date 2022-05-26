import config from '../config/app.config.json'
import { expressjwt } from 'express-jwt'
import mysql from './database'
import { Request } from 'express'

export const jwt = () => {
  const secret = config.jwt.secret
  return expressjwt({ secret, algorithms: ['HS256'], isRevoked: isRevokedCallback }).unless({
    path: [
      '/login',
      '/register',
      '/greeting/guest',
      '/greeting/add',
      // eslint-disable-next-line no-useless-escape
    //   /^\/student\/simplified\/([^\/]*)$/
    ]
  })
}

const isRevokedCallback = async (req: Request, payload: any) => {
  try {
    const user = await mysql.query('SELECT email FROM auth_user WHERE id = ?', [payload.payload.i])

    if (user.code === 'EMPTY_RESULT') return true

    return false
  } catch (error) {
    console.log('Middleware revoked callback Error: ', error)

    return true
  }
}
