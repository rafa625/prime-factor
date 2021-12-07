import { Test, TestingModule } from '@nestjs/testing'
import FactorController from './factor.controller'
import FactorService from './factor.service'
import PrimeService from './prime/prime.service'
import mockFactorService from './test/mockFactorService'
import mockPrimeService from './test/mockPrimeService'

describe('FactorController', () => {
  let controller: FactorController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactorController],
      providers: [
        {
          provide: FactorService,
          useValue: mockFactorService
        },
        {
          provide: PrimeService,
          useValue: mockPrimeService
        }
      ]
    }).compile()

    controller = module.get<FactorController>(FactorController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
