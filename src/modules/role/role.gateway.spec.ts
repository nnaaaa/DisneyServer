import { Test, TestingModule } from '@nestjs/testing'
import { RoleGateway } from './role.gateway'

describe('RoleGateway', () => {
    let gateway: RoleGateway

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleGateway],
        }).compile()

        gateway = module.get<RoleGateway>(RoleGateway)
    })

    it('should be defined', () => {
        expect(gateway).toBeDefined()
    })
})
