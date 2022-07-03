import { Test, TestingModule } from '@nestjs/testing'
import { ReactGateway } from './react.gateway'

describe('ReactGateway', () => {
    let gateway: ReactGateway

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactGateway],
        }).compile()

        gateway = module.get<ReactGateway>(ReactGateway)
    })

    it('should be defined', () => {
        expect(gateway).toBeDefined()
    })
})
