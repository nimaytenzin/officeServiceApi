import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Seats extends Model {


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    busId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    seatNumber: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })

    type: string;

   
}