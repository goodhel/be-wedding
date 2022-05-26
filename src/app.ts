import express from 'express'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv'
import { jwt } from './helpers/middleware'
import response from './helpers/response'

dotenv.config()

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(jwt())

routes(app)

app.use(response.errorHandler)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})