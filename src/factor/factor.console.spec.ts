import { Test, TestingModule } from '@nestjs/testing'
import { Mock } from '../commons/test-utils/mock.type'
import mockCli from '../myConsole/tests/mockCli'
import FactorConsole from './factor.console'
import FactorService from './factor.service'
import PrimeService from './prime/prime.service'
import mockFactorService from './test/mockFactorService'
import mockPrimeService from './test/mockPrimeService'

describe('FactorConsole', () => {
  let factorConsole: FactorConsole
  let factorService: Mock<FactorService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FactorConsole,
        {
          provide: FactorService,
          useValue: mockFactorService
        },
        {
          provide: 'Cli',
          useValue: mockCli
        },
        {
          provide: PrimeService,
          useValue: mockPrimeService
        }
      ],
    }).compile()

    factorConsole = module.get<FactorConsole>(FactorConsole)
    factorService = module.get(FactorService)
  })

  it('should be defined', () => {
    expect(factorConsole).toBeDefined()
    expect(factorService).toBeDefined()
  })

  describe('factor', () => {
    it('sould be defined', () => {
      expect(factorConsole.factor).toBeDefined()
    })

    it('should handle service', async () => {
      await factorConsole.factor()
      expect(factorService.start).toHaveBeenCalled()
    })

    it('must validate the entry of a number', () => {
      expect(factorConsole.factor).toBeDefined()
    })

    it('must invalidate the entry of a non-numeric', () => {
      expect(factorConsole.factor).toBeDefined()
    })
  })
})
