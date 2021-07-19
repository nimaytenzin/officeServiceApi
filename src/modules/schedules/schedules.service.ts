import { Injectable,Inject } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { ScheduleDto} from './dto/schedule.dto';
import { SCHEDULE_REPOSITORY } from '../../core/constants';
import sequelize from 'sequelize';

@Injectable()
export class SchedulesService {

    constructor(@Inject(SCHEDULE_REPOSITORY) private readonly scheduleRepository: typeof Schedule) { }

    async create(schedule: ScheduleDto): Promise<Schedule> {
        return await this.scheduleRepository.create<Schedule>(schedule);
    }

    async findOneById(id: number): Promise<Schedule> {
        return await this.scheduleRepository.findOne<Schedule>({ 
            where: { id } });
    }

    async findAllByDate(date1: string): Promise<Schedule[]>{
        return await this.scheduleRepository.findAll<Schedule>({
            where: sequelize.where(
                sequelize.fn('date',sequelize.col('departureTime')),
                "=",
                date1
            )
        })
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