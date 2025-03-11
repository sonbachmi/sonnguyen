import * as http from 'http'
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {initDb} from './store'

const app = express()

app.use(cors())
app.use(express.json())

initDb()

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - title
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The todo description (optional)
 *         completed:
 *           type: boolean
 *           completed: Completion status (optional, default false)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the todo was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the todo was updated
 *       example:
 *         id: d5fE_asz
 *         title: First task of day
 *         description: Do these stuff...
 *         completed: false
 *         createdAt: 2024-03-10T04:05:06.157Z
 */

/**
 * @openapi
 * /todos:
 *   get:
 *     description: Get todo list
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Returns todo array Todo[]
 */
app.get('/todos', (req: Request, res: Response) => {
    res.json([])
})

const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Son Nguyen's CRUD Server",
            version: "0.1.0",
            description:
                "Simple CRUD API application made with Express TypeScript to answer challenge from 99 Tech",
            contact: {
                name: "Son Nguyen",
                email: "sonnhjamy@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./dist/server.js"],
    docExpansion: 'full',
};

const specs = swaggerJsdoc(swaggerOptions);
app.use(
    "/apidocs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
    })
);
const port = 3000
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
    console.log(`API docs on http://localhost:${port}/apidocs`)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error: {
            stack: err.stack,
            message: err.message
        }
    })
})