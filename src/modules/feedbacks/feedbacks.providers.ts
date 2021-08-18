import { Feedback } from './feedback.entity';
import { FEEDBACKS_REPOSITORY } from '../../core/constants';

export const feedbacksProviders = [{
    provide: FEEDBACKS_REPOSITORY,
    useValue: Feedback,
}];