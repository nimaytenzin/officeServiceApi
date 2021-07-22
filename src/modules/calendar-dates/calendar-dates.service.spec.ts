import { Test, TestingModule } from '@nestjs/testing';
import { CalendarDatesService } from './calendar-dates.service';

describe('DatesService', () => {
  let service: CalendarDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarDatesService],
    }).compile();

    service = module.get<CalendarDatesService>(CalendarDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
