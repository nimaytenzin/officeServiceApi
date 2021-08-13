import { Body,Controller, Get, Param, Post, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { StopsService } from './stops.service';
import { Stop } from './stop.entity';
import { StopDto } from './dto/stop.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('stops')
export class StopsController {
    constructor(private stopService: StopsService){}


    @Get()
    async findAll():Promise<Stop[]>{
        return await this.stopService.findAll();
    }

    @Get(':id')
    async findOneById(@Param('id') id:number){
        return await this.stopService.findOneById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() stops: StopDto){
        return await this.stopService.create(stops);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number,@Body() stops: StopDto){
        const { numRows, num} = await this.stopService.update(id, stops);

        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Updated sccuessfully';
    }
    @UseGuards(AuthGuard('jwt'))

    @Delete(':id')
    async delete(@Param('id') id: number ) {
        const deleted = await this.stopService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
