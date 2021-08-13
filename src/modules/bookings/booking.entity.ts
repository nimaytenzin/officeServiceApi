import { Table, Column, Model, DataType, BelongsTo,ForeignKey,HasMany } from 'sequelize-typescript';
import { BookedSeat } from '../booked-seats/booked-seats.entity';
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
        type: DataType.STRING,
        allowNull: false,
    })
    customerName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    customerContact: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    customerCid: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    accNo: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    accName: string;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    bankName: string;


    @Column({
        type: DataType.ENUM,
        values: ["PAID","UNPAID"],
        allowNull: false,
        defaultValue: "UNPAID"
    })
    paymentStatus: string;

    @Column({
        type: DataType.ENUM,
        values: ["CHECKOUT","CHECKIN","CANCELLED","REFUNDED"],
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
        allowNull: true 
    })
    busId: number;
    @BelongsTo(()=>Bus)
    bus: Bus;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false 
    })
    amount: number;


    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true 
    })
    operatorId: number;
    @BelongsTo(()=>User)
    user: User;

    @HasMany(() => BookedSeat)
    bookedSeats: BookedSeat[]
    
}