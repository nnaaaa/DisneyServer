import { Test, TestingModule } from '@nestjs/testing';
import { SelectGateway } from './select.gateway';

describe('SelectGateway', () => {
  let gateway: SelectGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectGateway],
    }).compile();

    gateway = module.get<SelectGateway>(SelectGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
