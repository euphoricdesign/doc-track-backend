import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import router from './routes/indexRouter'
const cors = require('cors')

const server = express()

server.use(morgan('dev'))

server.use(cors()) 

server.use(express.json())

server.use(router)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.statusCode)
    res.status(err.statusCode || 500).json({ error: err.message })
})

export default server