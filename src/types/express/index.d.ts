/* eslint-disable no-unused-vars */
interface PayloadUser {
    i: number
    e: string
    t: string
  }
  
  declare namespace Express {
    interface Request {
      auth: PayloadUser
    }
  }
  