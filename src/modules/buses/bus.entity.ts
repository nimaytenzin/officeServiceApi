import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { BusType } from '../bus-types/busType.entity';
import { Schedule } from '../schedules/schedule.entity';
import { Seat } from '../seats/seat.entity';

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

    
    @HasMany(() => Seat)
    seat: Seat[];

    @HasOne(() => BusType)
    busType: BusType[];

    @HasMany(() => Schedule)
    schedule: Schedule;


}