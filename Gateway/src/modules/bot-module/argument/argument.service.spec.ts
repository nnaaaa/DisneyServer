import { Test, TestingModule } from '@nestjs/testing'
import { ArgumentService } from './argument.service'

describe('ArgumentService', () => {
    let service: ArgumentService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArgumentService],
        }).compile()

        service = module.get<ArgumentService>(ArgumentService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
