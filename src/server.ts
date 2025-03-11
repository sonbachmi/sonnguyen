import * as http from 'http'
import express, {Request, Response} from 'express'
import cors from 'cors'

import {initDb} from './store'

const app = express()

app.use(cors())
app.use(express.json())

initDb()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

const server = http.createServer(app)
const port = 3000
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})

app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({
        error: {
            stack: err.stack,
            message: err.message
        }
    })
})