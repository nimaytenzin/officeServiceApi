import { Injectable,Inject } from '@nestjs/common';
import { ROUTES_REPOSITORY } from 'src/core/constants';
import { RouteDay } from '../route-day/route-day.entity';
import { Stop } from '../stops/stop.entity';
import { RouteDto } from './dto/route.dto';
import { Route } from './route.entity';

@Injectable()
export class RoutesService {
    constructor(@Inject(ROUTES_REPOSITORY) private readonly routesRepository: typeof Route) { }

    async create(route: RouteDto): Promise<Route> {
        return await this.routesRepository.create<Route>(route);
    }

   

    async findAll(): Promise<Route[]> {
        return this.routesRepository.findAll({
            include:[
                {
                    model:Stop,
                    as:'origin'
                 },
                 {
                     model:Stop,
                     as:"destination"
                 },
                 {
                     model:RouteDay
                 }
        ]
        } );
      }

    async findOneById(id: number): Promise<Route> {
        return await this.routesRepository.findOne<Route>({ 
            where: { id } });
    }

    async findAllByOriginId(originId: number): Promise<Route[]> {
        return await this.routesRepository.findAll<Route>({ 
            where: { 
                originId:originId
            } 
        });
    }

    async findRouteByOriginDestination(originId:number, destinationId:number){
        return await this.routesRepository.findAll<Route>({
            where:{
                originId:originId,
                destinationId:destinationId
            }
        })
    }

    async findAllByDestinationId(destId: number): Promise<Route[]> {
        return await this.routesRepository.findAll<Route>({ 
            where: { 
                destinationId : destId
            } 
        });
    }

    async update(id,data){
        const [numRows,num] = await this.routesRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.routesRepository.destroy({where:{ id }});
    }
}
