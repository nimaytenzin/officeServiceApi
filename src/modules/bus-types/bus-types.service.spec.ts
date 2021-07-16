import { Test, TestingModule } from '@nestjs/testing';
import { BusTypesService } from './bus-types.service';

describe('BusTypesService', () => {
  let service: BusTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusTypesService],
    }).compile();

    service = module.get<BusTypesService>(BusTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
