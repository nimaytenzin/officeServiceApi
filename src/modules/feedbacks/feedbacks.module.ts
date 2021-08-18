import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { feedbacksProviders } from './feedbacks.providers';

@Module({
  providers: [FeedbacksService,...feedbacksProviders],
  exports:[FeedbacksService],
  controllers: [FeedbacksController]
})
export class FeedbacksModule {}

