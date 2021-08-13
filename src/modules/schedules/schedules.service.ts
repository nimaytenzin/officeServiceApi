import { Injectable, Inject } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { ScheduleDto } from './dto/schedule.dto';
import { SCHEDULE_REPOSITORY } from '../../core/constants';
import { BOOKING_REPOSITORY } from '../../core/constants';
import sequelize, { DataTypes } from 'sequelize';
import { Op } from 'sequelize';
import { CalendarDatesService } from '../calendar-dates/calendar-dates.service';
import { ScheduleDayDto } from './dto/schedule-day.dto';

import { BookingsService} from '../bookings/bookings.service'
import { Booking } from '../bookings/booking.entity';
import { BookedSeat } from '../booked-seats/booked-seats.entity';
import { Route } from '../routes/route.entity';
import { Bus } from '../buses/bus.entity';
import { CalendarDate } from '../calendar-dates/calendar-dates.entity';
import { Stop } from '../stops/stop.entity';
import { all } from 'sequelize/types/lib/operators';
@Injectable()
export class SchedulesService {

    constructor(@Inject(SCHEDULE_REPOSITORY)  private readonly scheduleRepository: typeof Schedule,
     private calendarDatesService: CalendarDatesService,
     private bookingsService:BookingsService
     ) { }

    async create(schedule: ScheduleDto): Promise<Schedule> {
        return await this.scheduleRepository.create<Schedule>(schedule);
    }

    async findOneById(id: number): Promise<Schedule> {
        return await this.scheduleRepository.findOne<Schedule>({ 
            where: { id },
            include: [
                {
                    model:Booking,
                    include:[
                        {
                            model:BookedSeat,
                            where:{
                                scheduleId:id
                            }
                        }
                    ]
                },
                {
                    model:Route,
                    include: [{
                        all: true,
                        nested: true
                    }]
                },
                {
                    model:Bus
                },
                {
                    model:CalendarDate
                }
            ]
    })}

    async createScheduleOnDayBetweenDate(scheduleObject: ScheduleDayDto): Promise<Schedule[]> {
        var dayStrings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const indexPromise = Promise.resolve(null);


        var masterSchedule = []
        for (var item of scheduleObject.onDays) {
            var schedules = [];
            var dayName = dayStrings[item];
            var dates = await this.calendarDatesService.findAllDayBetweenDates(dayName, scheduleObject.fromDate, scheduleObject.toDate);
            dates.forEach((item, i) => {
                schedules.push({ dateId: item["Calendar_Date"], routeId: scheduleObject.routeId })
            })
            var createdSchedule = await this.scheduleRepository.bulkCreate(schedules);
            masterSchedule.push(createdSchedule);
        }
        return masterSchedule;
    }

    async findAllByRoute(id: number): Promise<Schedule[]> {
        return await this.scheduleRepository.findAll<Schedule>({
            where: {
                routeId: id
            }
        });
    }

    async findByRouteDate(routeId: number, date): Promise<Schedule[]> {
        return await this.scheduleRepository.findAll<Schedule>({
            where: {
                routeId: routeId,
                dateId: {
                    [Op.eq]: date
                  }
            }
        });
    }

    async findBusByBookingId(bookingId: number): Promise<Schedule> {
        let booking = await this.bookingsService.findOneById(bookingId)
        let scheduleId = booking.scheduleId
        console.log(booking.scheduleId)
        return await this.scheduleRepository.findOne<Schedule>({
            where: {
                id: scheduleId
            },
            include: [{
                all: true,
                nested: true
            }]
        });
    }

    async findAllBetweenDates(from: Date, to: Date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: {
                dateId: {
                    [Op.between]: [from, to]
                }
            }
        });
    }


    async getNextSevenDaySchedule():Promise<Schedule[]>{
        var from = new Date().getTime()
        var to = new Date().setDate(new Date().getDate() + 7)
        
        return this.scheduleRepository.findAll({
            where: {
                dateId: {
                    [Op.between]: [from, to]
                }
            }
        });
    }

    async findByDate(date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: sequelize.where(
                sequelize.fn('date', sequelize.col('dateId')),
                "=",
                date
            ),
            include: [{
                all: true,
                nested: true
            }]
        } ,
        );
    }





    async update(id, data) {
        const [numRows, num] = await this.scheduleRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        return { numRows, num }
    }

    async cancelSchedule(id,data){
        const [numRows, num] = await this.scheduleRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        console.log("Updating ")
        return { numRows, num }
    }


    async delete(id) {
        return await this.scheduleRepository.destroy({ where: { id } });
    }

    async deleteByRouteId(id) {
        return await this.scheduleRepository.destroy({
            where: sequelize.where(
                sequelize.fn('date', sequelize.col('routeId')),
                "=",
                id
            ),
        });
    }
}


