import { Test, TestingModule } from '@nestjs/testing'
import FactorService from './factor.service'
import PrimeRepository from './prime/prime.repository'

import factorDummies from './test/factorDummies'
import mockPrimeRepository from './test/mockPrimesRepository'

describe('FactorService', () => {
    let factorService: FactorService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FactorService,
                {
                    provide: PrimeRepository,
                    useValue: mockPrimeRepository
                }
            ],
        }).compile()

        factorService = module.get<FactorService>(FactorService)
    })

    it('should be defined', () => {
        expect(factorService).toBeDefined()
    })

    it('must have a list of prime numbers greater than or equal to 5', () => {
        expect(factorService.primes).toBeDefined()
        expect(factorService.primes.length).toBeGreaterThanOrEqual(5)
    })

    it('must have the first five known and ordered primes', () => {
        expect(factorService.primes).toStrictEqual([2, 3, 5, 7, 11])
    })

    describe('Decompose', () => {
        it('must decompose a number less than or equal to 100', () => {
            Object.keys(factorDummies).forEach((el) => {
                factorService.start(parseInt(el, 10))
                expect(factorService.factors).toStrictEqual(factorDummies[el].factors)
            })
        })
    })

    describe('numDividers', () => {
        it('must calculate the number of divisors', () => {
            Object.keys(factorDummies).forEach((el) => {
                factorService.start(parseInt(el, 10))
                expect(factorService.numDividers).toStrictEqual(factorDummies[el].numDividers)
            })
        })
    })

    describe('Dividers', () => {
        it('must list divisors of numbers less than or equal to 100', () => {
            Object.keys(factorDummies).forEach((el) => {
                factorService.start(parseInt(el, 10))
                expect(factorService.dividers).toEqual(factorDummies[el].dividers)
            })
        })
    })

    describe('primesDividers', () => {
        it('must list primes dividers', () => {
            Object.keys(factorDummies).forEach((el) => {
                factorService.start(parseInt(el, 10))
                expect(factorService.primesDividers).toEqual(factorDummies[el].primesDividers)
            })
        })
    })
})
