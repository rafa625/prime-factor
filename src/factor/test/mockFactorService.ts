import { Mock } from '../../commons/test-utils/mock.type'
import FactorService from '../factor.service'

const mockFactorService: Mock<FactorService> = {
    dividers: jest.fn(),
    factors: jest.fn(),
    numDividers: jest.fn(),
    primes: jest.fn(),
    primesDividers: jest.fn(),
    start: jest.fn()
}

export default mockFactorService
