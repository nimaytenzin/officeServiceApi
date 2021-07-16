import { Inject, Injectable } from '@nestjs/common';
import { BUSTYPES_REPOSITORY } from 'src/core/constants';
import { BusType } from './bus-types.entity';
import { BusTypeDto } from './dto/bus-types.dto';

@Injectable()
export class BusTypesService {


    constructor(@Inject(BUSTYPES_REPOSITORY) private readonly busTypesRepository: typeof BusType){}


    async create(busType: BusTypeDto): Promise<BusType> {
        return await this.busTypesRepository.create<BusType>(busType);
    }

    async findAll(): Promise<BusType[]> {
        return this.busTypesRepository.findAll();
      }

    async findOneById(id: number): Promise<BusType> {
        return await this.busTypesRepository.findOne<BusType>({ 
            where: { id } });
    }

    async update(id,data){
        const [numRows,num] = await this.busTypesRepository.update(
            {...data},
            {
                where:{ id },
                returning: true
            }
        );
        return { numRows,num}
    }

    async delete(id) {
        return await this.busTypesRepository.destroy({ where: { id } });
    }
}



