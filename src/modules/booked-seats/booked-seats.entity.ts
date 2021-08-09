import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { Booking } from '../bookings/booking.entity';
import { Schedule } from '../schedules/schedule.entity';
import { Seat } from '../seats/seat.entity';


@Table
export class BookedSeat extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    seatNumber: number;

    @ForeignKey(() => Booking)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    bookingId: number;

    @BelongsTo(() => Booking)
    booking: Booking;


    @ForeignKey(() => Schedule)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    scheduleId: number;

    @BelongsTo(() => Schedule)
    schedule: Schedule;
}


