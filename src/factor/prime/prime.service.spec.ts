import { Test, TestingModule } from '@nestjs/testing'
import { Mock } from 'src/commons/test-utils/mock.type'

import PrimeRepository from './prime.repository'
import PrimeService from './prime.service'
import mockPrimeRepository from '../test/mockPrimesRepository'

describe('PrimeService', () => {
    let primeService: PrimeService
    let primeRepository: Mock<PrimeRepository>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrimeService,
                {
                    provide: PrimeRepository,
                    useValue: mockPrimeRepository
                }
            ],
        }).compile()

        primeService = module.get<PrimeService>(PrimeService)
        primeRepository = module.get(PrimeRepository)
    })

    it('should be defined', () => {
        expect(primeService).toBeDefined()
    })

    it('must have a list of prime numbers greater than or equal to 5', () => {
        expect(primeService.list).toBeDefined()
        expect(primeService.list.length).toBeGreaterThanOrEqual(5)
    })

    it('must have the first five known and ordered primes', () => {
        expect(primeService.list).toStrictEqual([2, 3, 5, 7, 11])
    })

    it('must list the largest stored prime number', () => {
        expect(primeService.max).toBeGreaterThanOrEqual(11)
    })

    describe('Discover', () => {
        it('must discover new prime numbers', () => {
            const { max } = primeService
            primeRepository.save.mockReturnValue([])
            primeService.discover()
            expect(primeService.max).toBeGreaterThan(max)
        })
    })
})
