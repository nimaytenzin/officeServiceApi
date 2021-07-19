import { Table, Column, Model, DataType, BelongsTo,ForeignKey } from 'sequelize-typescript';
import { Bus } from '../buses/bus.entity';
import { Schedule } from '../schedules/schedule.entity';
import { User } from '../users/user.entity';

@Table
export class Booking extends Model {
    @ForeignKey(()=>Schedule)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    scheduleId: number;
    @BelongsTo(()=>Schedule)
    schedule: Schedule;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    bookingTime: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    customerContact: number;

    @Column({
        type: DataType.ENUM,
        values: ["PAID","UNPAID"],
        allowNull: false,
        defaultValue: "UNPAID"
    })
    paymentStatus: string;

    @Column({
        type: DataType.ENUM,
        values: ["CHECKOUT","CHECKIN"],
        allowNull: false,
        defaultValue: "CHECKOUT"
    })
    checkInStatus: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    checkSum: string;

    @ForeignKey(()=>Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false 
    })
    busId: number;
    @BelongsTo(()=>Bus)
    bus: Bus;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true 
    })
    amount: number;

    @Column({
        type: DataType.STRING,
        allowNull: true 
    })
    customerName: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true 
    })
    operatorId: number;
    @BelongsTo(()=>User)
    user: User;
}