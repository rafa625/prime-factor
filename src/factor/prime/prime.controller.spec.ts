import { Test, TestingModule } from '@nestjs/testing'
import PrimeController from '../prime/prime.controller'
import mockPrimeService from '../test/mockPrimeService'
import PrimeService from './prime.service'

describe('PrimeController', () => {
  let controller: PrimeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimeController],
      providers: [
        {
          provide: PrimeService,
          useValue: mockPrimeService
        }
      ]
    }).compile()

    controller = module.get<PrimeController>(PrimeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
