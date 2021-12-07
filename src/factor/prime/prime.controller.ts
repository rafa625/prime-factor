import { Controller, Get } from '@nestjs/common'
import PrimeService from './prime.service'

@Controller('prime')
export default class PrimeController {
    constructor(
        private readonly primeService: PrimeService
    ) { }

    @Get('/discover')
    discover(): Partial<PrimeService> {
        this.primeService.discover()
        return {
            max: this.primeService.max
        }
    }
}
