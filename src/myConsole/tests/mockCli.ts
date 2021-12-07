import { Mock } from '../../commons/test-utils/mock.type'
import CliInterface from '../cli.interface'

const mockCli: Mock<CliInterface> = {
    info: jest.fn(),
    ask: jest.fn()
}

export default mockCli
