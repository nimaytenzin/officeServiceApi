import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { BusType } from '../bus-types/bus-types.entity';
import { Seats } from '../seats/seats.entity';

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

    
    @HasMany(() => Seats)
    seats: Seats[];

    @HasOne(() => BusType)
    busType: BusType[];



}