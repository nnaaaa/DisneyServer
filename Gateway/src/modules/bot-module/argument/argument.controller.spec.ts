import { Test, TestingModule } from '@nestjs/testing'
import { ArgumentController } from './argument.controller'

describe('ArgumentController', () => {
    let controller: ArgumentController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArgumentController],
        }).compile()

        controller = module.get<ArgumentController>(ArgumentController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
