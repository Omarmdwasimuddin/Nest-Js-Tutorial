import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBdController } from './employee-bd.controller';

describe('EmployeeBdController', () => {
  let controller: EmployeeBdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeBdController],
    }).compile();

    controller = module.get<EmployeeBdController>(EmployeeBdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
