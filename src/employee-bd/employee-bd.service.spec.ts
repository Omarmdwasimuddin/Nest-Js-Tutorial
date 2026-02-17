import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBdService } from './employee-bd.service';

describe('EmployeeBdService', () => {
  let service: EmployeeBdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBdService],
    }).compile();

    service = module.get<EmployeeBdService>(EmployeeBdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
