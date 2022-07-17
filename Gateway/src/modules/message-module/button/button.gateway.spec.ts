import { Test, TestingModule } from '@nestjs/testing'
import { ButtonGateway } from './button.gateway'

describe('ButtonGateway', () => {
    let gateway: ButtonGateway

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ButtonGateway],
        }).compile()

        gateway = module.get<ButtonGateway>(ButtonGateway)
    })

    it('should be defined', () => {
        expect(gateway).toBeDefined()
    })
})
