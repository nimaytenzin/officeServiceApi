import { Injectable,Inject } from '@nestjs/common';
import { ROUTES_REPOSITORY } from 'src/core/constants';
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
            include:[{
                all:true,
                nested:true
            }]
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
