import { Mock } from '../../commons/test-utils/mock.type'
import PrimeRepository from '../prime/prime.repository'

const mockPrimeRepository: Mock<PrimeRepository> = {
    all: jest.fn().mockReturnValue([2, 3, 5, 7, 11]),
    save: jest.fn()
}

export default mockPrimeRepository
