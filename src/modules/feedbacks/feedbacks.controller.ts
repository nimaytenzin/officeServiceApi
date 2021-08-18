import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto'
import { FeedbacksService } from "./feedbacks.service"
import { Feedback  } from './feedback.entity'
@Controller('feedbacks')
export class FeedbacksController {

    constructor(
        private feedbackService: FeedbacksService
    ) { }

    @Post()
    async create(@Body() feedback: FeedbackDto) {
        return await this.feedbackService.create(feedback);

    }

    @Get()
    async findAll():Promise<Feedback[]>{
        return await this.feedbackService.findAll();
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() feedback: FeedbackDto) {
        const { numRows, num} = await this.feedbackService.update(id, feedback);

        console.log("Updating without deleting")
        if (numRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return 'updated sccuessfully';
    }

   

}
