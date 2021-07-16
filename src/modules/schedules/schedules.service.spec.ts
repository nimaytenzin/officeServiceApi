import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });


  it('should_get_schedule',async ()=>{
    var result = null;
    result = service.findOneById(1);
    expect(result).toBeDefined;
  })
});
