import { Test, TestingModule } from '@nestjs/testing';
import { CalendarDatesController } from './calendar-dates.controller';

describe('DatesController', () => {
  let controller: CalendarDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarDatesController],
    }).compile();

    controller = module.get<CalendarDatesController>(CalendarDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
