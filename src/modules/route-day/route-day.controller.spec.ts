import { Test, TestingModule } from '@nestjs/testing';
import { RouteDayController } from './route-day.controller';

describe('RouteDayController', () => {
  let controller: RouteDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteDayController],
    }).compile();

    controller = module.get<RouteDayController>(RouteDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
