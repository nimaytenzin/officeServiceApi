import { Injectable,Inject } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { ScheduleDto} from './dto/schedule.dto';
import { SCHEDULE_REPOSITORY } from '../../core/constants';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class SchedulesService {

    constructor(@Inject(SCHEDULE_REPOSITORY) private readonly scheduleRepository: typeof Schedule) { }

    async create(schedule: ScheduleDto): Promise<Schedule> {
        return await this.scheduleRepository.create<Schedule>(schedule);
    }

    async findAllByRoute(id: number): Promise<Schedule[]> {
        return await this.scheduleRepository.findAll<Schedule>({ 
            where: { 
                routeId: id
            } });
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