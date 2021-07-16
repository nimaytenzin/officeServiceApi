import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Bus extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    vechileNumber: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    typeId: number;
}