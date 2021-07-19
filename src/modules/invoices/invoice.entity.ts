import { Table, Column, Model, DataType,ForeignKey,BelongsTo, HasOne } from 'sequelize-typescript';
import { Booking } from 'src/modules/bookings/booking.entity';

@Table
export class Invoice extends Model {

    @ForeignKey(() => Booking)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    bookingId: number;
    @BelongsTo(()=>Booking)
    booking: Booking;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    txnTime: Date;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.ENUM,
        values: ["PAID","UNPAID"],
        allowNull: false,
        defaultValue: "UNPAID"
    })
    paymentStatus: string;
}