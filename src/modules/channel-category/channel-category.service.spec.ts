import { Test, TestingModule } from '@nestjs/testing'
import { ChannelCategoryService } from './channel-category.service'

describe('ChannelCategoryService', () => {
  let service: ChannelCategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelCategoryService],
    }).compile()

    service = module.get<ChannelCategoryService>(ChannelCategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
