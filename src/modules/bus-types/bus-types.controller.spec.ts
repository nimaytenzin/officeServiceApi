import { Test, TestingModule } from '@nestjs/testing';
import { BusTypesController } from './bus-types.controller';

describe('BusTypesController', () => {
  let controller: BusTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusTypesController],
    }).compile();

    controller = module.get<BusTypesController>(BusTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
