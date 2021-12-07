import { Test, TestingModule } from '@nestjs/testing'
import { JsonDB } from 'node-json-db'
import { Mock } from 'src/commons/test-utils/mock.type'

import PrimeRepository from './prime.repository'

describe('PrimeRepository', () => {
    let primeRepository: PrimeRepository
    let db: Mock<JsonDB>

    const mockJsonDB = {
        getData: jest.fn(),
        save: jest.fn(),
        push: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrimeRepository,
                {
                    provide: 'JsonDatabase',
                    useValue: mockJsonDB
                }
            ],
        }).compile()

        primeRepository = module.get(PrimeRepository)
        db = module.get<Mock<JsonDB>>('JsonDatabase')
    })

    it('should be defined', () => {
        expect(primeRepository).toBeDefined()
        expect(primeRepository).toBeDefined()
    })

    describe('save', () => {
        it('should add and save data', () => {
            db.push.mockReturnValue([])
            db.save.mockReturnValue([])
            primeRepository.save = [2, 3, 5, 7, 11, 17]
            expect(db.push).toHaveBeenCalled()
            expect(db.save).toHaveBeenCalled()
        })
    })

    describe('all', () => {
        it('should list db data', () => {
            db.getData.mockReturnValue([2, 3, 5, 7, 11, 17])
            const primes = primeRepository.all()
            expect(db.getData).toHaveBeenCalled()
            expect(primes).toStrictEqual([2, 3, 5, 7, 11, 17])
        })
    })
})
