import { Test, TestingModule } from '@nestjs/testing';
import { BookedSeatsService } from './booked-seats.service';

describe('BookedSeatsService', () => {
  let service: BookedSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedSeatsService],
    }).compile();

    service = module.get<BookedSeatsService>(BookedSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
