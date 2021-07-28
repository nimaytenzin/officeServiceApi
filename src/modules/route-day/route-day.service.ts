import { Injectable, Inject} from '@nestjs/common';
import { ROUTEDAYS_REPOSITORY } from 'src/core/constants';
import { RouteDayDto } from './dto/routeDay.dto';
import { RouteDay } from './route-day.entity';

@Injectable()
export class RouteDayService {
    constructor( @Inject(ROUTEDAYS_REPOSITORY) private readonly routeDayRepository: typeof RouteDay) { }

    async create(routeDay: RouteDayDto): Promise<RouteDay> {
        return await this.routeDayRepository.create<RouteDay>(routeDay);
    }

    async createBulk(routeDayArray): Promise<RouteDay[]> {
        return await this.routeDayRepository.bulkCreate(routeDayArray);
    }

    async findAllByRouteId(routeId: number): Promise<RouteDay[]> {
        return await this.routeDayRepository.findAll<RouteDay>({ 
            where: { 
                routeId : routeId
            } 
        });
    }

    async update(id,data){
        const [numRows,num] = await this.routeDayRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.routeDayRepository.destroy({ where: { id } });
    }
}
