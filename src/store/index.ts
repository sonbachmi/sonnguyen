import {Sequelize} from 'sequelize-typescript'
import {Todo} from '../models/Todo'
import path from 'node:path'

const dbPath = path.join(process.cwd(), 'src', 'store', 'todos.db');

let sequelize: Sequelize

export function getDb() {
    return sequelize
}

export function initDb() {
    if (!sequelize) {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: dbPath,
            models: [Todo]
        })
        sequelize.sync()
    } else {
    }
}


