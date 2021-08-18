import { Inject, Injectable } from '@nestjs/common';
import { FEEDBACKS_REPOSITORY } from 'src/core/constants';

import { Feedback } from './feedback.entity';
import { FeedbackDto } from './dto/feedback.dto';


@Injectable()
export class FeedbacksService {

    constructor(@Inject(FEEDBACKS_REPOSITORY) private readonly feedbackRepository: typeof Feedback) { }


    async create(feedback: FeedbackDto): Promise<Feedback> {
        return await this.feedbackRepository.create<Feedback>(feedback);
    }

    async findAll(): Promise<Feedback[]> {
        return this.feedbackRepository.findAll({
            where:{
                dismissed: false
            }
        });
    }



    async update(id, data) {
        const [numRows, num] = await this.feedbackRepository.update(
            { ...data },
            {
                where: { id },
                returning: true
            }
        );
        return { numRows, num }
    }

    async delete(id) {
        return await this.feedbackRepository.destroy({ where: { id } });
    }


}
