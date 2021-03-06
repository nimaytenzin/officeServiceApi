import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table
export class Designation extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}