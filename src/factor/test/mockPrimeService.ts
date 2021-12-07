import { Mock } from '../../commons/test-utils/mock.type'
import PrimeService from '../prime/prime.service'

const mockPrimeService: Mock<PrimeService> = {
    discover: jest.fn(),
    list: jest.fn(),
    max: jest.fn()
}

export default mockPrimeService
