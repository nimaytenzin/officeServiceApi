import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class BusType extends Model {


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    busId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    type: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    capacity: number;
}