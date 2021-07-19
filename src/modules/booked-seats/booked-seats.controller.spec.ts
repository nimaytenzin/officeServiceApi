import { Test, TestingModule } from '@nestjs/testing';
import { BookedSeatsController } from './booked-seats.controller';

describe('BookedSeatsController', () => {
  let controller: BookedSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookedSeatsController],
    }).compile();

    controller = module.get<BookedSeatsController>(BookedSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
