import { Injectable,Inject } from '@nestjs/common';
import { DATES_REPOSITORY } from 'src/core/constants';
import { CalendarDate } from './calendar-dates.entity';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class CalendarDatesService {
    constructor(@Inject(DATES_REPOSITORY) private readonly datesRepository: typeof CalendarDate){}

    async findAllDayBetweenDates(day:string,from: Date,to: Date): Promise<CalendarDate[]> {
        return this.datesRepository.findAll({
            where: {
                Calendar_Date:{
                    [Op.between]:[from,to]
                },
                Day_Name: day
            }
        });
    }

    async findOneByDate(dateId: string): Promise<CalendarDate> {
        return this.datesRepository.findOne({
            // where: {
            //     Calendar_Date: "2021-07-22" 
            // }
            where: sequelize.where(
                sequelize.fn('date',sequelize.col('Calendar_Date')),
                "=",
                dateId
            )
        });
    }
}
