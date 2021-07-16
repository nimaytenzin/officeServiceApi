import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Booking extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    scheduleId: number;

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

    @Column({
        type: DataType.INTEGER,
        allowNull: false 
    })
    busId: number;

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

    @Column({
        type: DataType.INTEGER,
        allowNull: true 
    })
    operatorId: number;
}