import { Inject, Injectable } from '@nestjs/common';
import { BUSES_REPOSITORY } from 'src/core/constants';
import { Bus } from './buses.entity';
import { BusDto } from './dto/buses.dto';

@Injectable()
export class BusesService {

   constructor(@Inject(BUSES_REPOSITORY) private readonly busesRepository: typeof Bus){}


    async create(bus: BusDto): Promise<Bus> {
        return await this.busesRepository.create<Bus>(bus);
    }


    async findAll(): Promise<Bus[]> {
        return this.busesRepository.findAll();
      }

    async findOneById(id: number): Promise<Bus> {
        return await this.busesRepository.findOne<Bus>({ 
            where: { id } });
    }

    async update(id,data){
        const [numRows,num] = await this.busesRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.busesRepository.destroy({ where: { id } });
    }

}
