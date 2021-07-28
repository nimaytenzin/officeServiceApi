import { Injectable,Inject } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { ScheduleDto} from './dto/schedule.dto';
import { SCHEDULE_REPOSITORY } from '../../core/constants';
import sequelize, { DataTypes } from 'sequelize';
import { Op } from 'sequelize';
import { CalendarDatesService } from '../calendar-dates/calendar-dates.service';
import { ScheduleDayDto } from './dto/schedule-day.dto';

@Injectable()
export class SchedulesService {

    constructor(@Inject(SCHEDULE_REPOSITORY) private readonly scheduleRepository: typeof Schedule, private calendarDatesService: CalendarDatesService) { }

    async create(schedule: ScheduleDto): Promise<Schedule> {
        return await this.scheduleRepository.create<Schedule>(schedule);
    }
    
    // async createScheduleOnDayBetweenDate(route:number,day:number,from:Date,to:Date): Promise<Schedule[]> {
    async createScheduleOnDayBetweenDate(scheduleObject: ScheduleDayDto): Promise<Schedule[]> {
        var dayStrings = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

        const indexPromise = Promise.resolve(null);


        var masterSchedule = []
        for (var item of scheduleObject.onDays){
            var schedules = [];
            var dayName = dayStrings[item];
            var dates = await this.calendarDatesService.findAllDayBetweenDates(dayName,scheduleObject.fromDate,scheduleObject.toDate);
            dates.forEach((item,i)=>{
                schedules.push({dateId:item["Calendar_Date"],routeId:scheduleObject.routeId})
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

    async findAllBetweenDates(from: Date,to: Date): Promise<Schedule[]> {
        return this.scheduleRepository.findAll({
            where: {
                Calendar_Date:{
                    [Op.between]:[from,to]
                }
            }
        });
    }


    async update(id,data){
        const [numRows,num] = await this.scheduleRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.scheduleRepository.destroy({ where: { id } });
    }
}