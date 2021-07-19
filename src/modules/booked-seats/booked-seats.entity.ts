import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo} from 'sequelize-typescript';
import { Booking } from '../bookings/booking.entity';
import { Seat } from '../seats/seat.entity';


@Table
export class BookedSeat extends Model {

    @ForeignKey(() => Seat)
    @Column({
        type: DataType.INTEGER,
        allowNull: false, 
    })
    seatId: number;

    @BelongsTo(() => Seat)
    seat: Seat;
   
    @ForeignKey(() => Booking)
    @Column({
        type: DataType.INTEGER,
        allowNull: false, 
    })
    bookingId: number;

    @BelongsTo(() => Booking)
    booking: Booking;
}


