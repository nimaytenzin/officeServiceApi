import { Test, TestingModule } from '@nestjs/testing';
import { RouteDayService } from './route-day.service';

describe('RouteDayService', () => {
  let service: RouteDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteDayService],
    }).compile();

    service = module.get<RouteDayService>(RouteDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
