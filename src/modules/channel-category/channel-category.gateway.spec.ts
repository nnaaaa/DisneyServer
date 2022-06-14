import { Test, TestingModule } from '@nestjs/testing'
import { ChannelCategoryGateway } from './channel-category.gateway'

describe('ChannelCategoryGateway', () => {
  let gateway: ChannelCategoryGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelCategoryGateway],
    }).compile()

    gateway = module.get<ChannelCategoryGateway>(ChannelCategoryGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
