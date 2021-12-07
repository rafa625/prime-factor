import { Controller, Get, Param, ValidationPipe } from '@nestjs/common'
import FactorDto from './factor.dto'
import FactorService from './factor.service'

@Controller('factor')
export default class FactorController {
    constructor(
        private readonly factorService: FactorService
    ) { }

    @Get(':number')
    factor(@Param(new ValidationPipe()) param: FactorDto): Partial<FactorService> {
        this.factorService.start(param.number)
        return {
            dividers: this.factorService.dividers,
            primesDividers: this.factorService.primesDividers
        }
    }
}
