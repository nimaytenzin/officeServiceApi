import { CalendarDate } from './calendar-dates.entity';
import { DATES_REPOSITORY} from '../../core/constants';

export const calendarDatesProviders = [{
    provide: DATES_REPOSITORY,
    useValue: CalendarDate,
}];