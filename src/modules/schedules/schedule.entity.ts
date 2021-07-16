import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Schedule extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    busId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    originId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    destinationId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    departureTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    ETA: Date;
}