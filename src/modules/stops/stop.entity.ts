import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';

@Table
export class Stop extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    contact: number;

}