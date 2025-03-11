import {Column, DataType, Model, Table} from 'sequelize-typescript'

@Table({
    tableName: 'todos'
})
export class Todo extends Model {
    @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER})
    declare id: number

    @Column({type: DataType.TEXT})
    declare title: string

    @Column({type: DataType.TEXT})
    declare description?: string

    @Column({type: DataType.TEXT})
    declare completed?: boolean
}


