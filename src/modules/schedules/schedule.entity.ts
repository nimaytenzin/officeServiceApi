import { Table, Column, Model, DataType,ForeignKey,BelongsTo, HasMany } from 'sequelize-typescript';
import { Bus } from '../buses/bus.entity';
import { BookedSeat } from '../booked-seats/booked-seats.entity'
import { CalendarDate } from '../calendar-dates/calendar-dates.entity';
import { Route } from '../routes/route.entity';
import { Booking } from '../bookings/booking.entity';

@Table
export class Schedule extends Model {

    @ForeignKey(() => Bus)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    busId: number;

    @BelongsTo(()=>Bus)
    bus: Bus;

    //originId
    @ForeignKey(()=>Route)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    routeId: number;
    
    @BelongsTo(()=>Route)
    route: Route;

    @ForeignKey(()=>CalendarDate)
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateId: Date;
    @BelongsTo(()=>CalendarDate)
    calendarDate: CalendarDate;

    @Column({
        type: DataType.TINYINT,
        allowNull: false,
        defaultValue:false
    })
    isFinished: number;

    @HasMany(() => Booking)
    bookings: Booking[]

    @HasMany(() => BookedSeat)
    bookedSeats: BookedSeat[]
}