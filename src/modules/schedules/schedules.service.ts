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
    
    runTask(spec){

    }
    // async createScheduleOnDayBetweenDate(route:number,day:number,from:Date,to:Date): Promise<Schedule[]> {
    async createScheduleOnDayBetweenDate(scheduleObject: ScheduleDayDto): Promise<Schedule[]> {
        var dayStrings = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

        var schedules = [];
        const indexPromise = Promise.resolve(null);
        await scheduleObject.onDays.reduce(
            (p,spec)=>p.then(()=>{
                var dayName = dayStrings[Number(spec)];
                this.calendarDatesService.findAllDayBetweenDates(dayName,scheduleObject.fromDate,scheduleObject.toDate).then(resp=>{
                    resp.forEach((x,i)=>{
                        console.log(x["Calendar_Date"])
                        schedules.push({dateId:x["Calendar_Date"],routeId:scheduleObject.routeId})
                    })
                }),
                indexPromise
            })
        )
        // scheduleObject.onDays.forEach((item,idx)=>{
        //     var dayName = dayStrings[Number(item)];
        //     var dayDates = await this.calendarDatesService.findAllDayBetweenDates(dayName,scheduleObject.fromDate,scheduleObject.toDate).then(resp=>{
        //         resp.forEach((x,i)=>{
        //             console.log(x["Calendar_Date"]);
        //             schedules.push({dateId:x['Calendar_Date'],routeId:scheduleObject.routeId});
        //         })
        //     });
        //     var dayDates = await this.calendarDatesService.findAllDayBetweenDates(dayName,scheduleObject.fromDate,scheduleObject.toDate);
        // });

        console.log(schedules);
        return await this.scheduleRepository.bulkCreate(schedules);
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