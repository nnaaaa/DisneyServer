import { Test, TestingModule } from '@nestjs/testing'
import { EmojiGateway } from './emoji.gateway'

describe('EmojiGateway', () => {
    let gateway: EmojiGateway

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmojiGateway],
        }).compile()

        gateway = module.get<EmojiGateway>(EmojiGateway)
    })

    it('should be defined', () => {
        expect(gateway).toBeDefined()
    })
})
