"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const store_1 = require("./store");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, store_1.initDb)();
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
 *           description: Completion status (optional, default false)
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
 *         description: Returns todo array
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Son Nguyen's CRUD Server",
            version: "0.1.0",
            description: "Simple CRUD API application made with Express TypeScript to answer challenge from 99 Tech",
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
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/apidocs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {}));
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`API docs on http://localhost:${port}/apidocs`);
});
app.use((err, req, res) => {
    res.status(500).json({
        error: {
            stack: err.stack,
            message: err.message
        }
    });
});
