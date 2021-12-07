import { Inject, Injectable } from '@nestjs/common'
import { Command } from '@squareboat/nest-console'
import CliInterface from 'src/myConsole/cli.interface'
import FactorService from './factor.service'
import PrimeService from './prime/prime.service'

@Injectable()
export default class FactorConsole {
    constructor(
        private readonly factorService: FactorService,
        private readonly primeService: PrimeService,
        @Inject('Cli') private readonly cli: CliInterface
    ) { }

    @Command('factor', {
        desc: 'factor a number'
    })
    async factor(): Promise<void> {
        const askNumber = await this.cli.ask('Digite um número: ')
        const number = parseInt(askNumber, 10)

        try {
            this.factorService.start(number)

            const { dividers } = this.factorService
            const { primesDividers } = this.factorService

            const message = []
            message.push(`\n\nNúmero de entrada: ${number}`)
            message.push(`Números divisores: ${dividers.join(' ')}`)
            message.push(`Divisores Primos: ${primesDividers.join(' ')}\n\n`)

            this.cli.info(message.join('\n\n'))
        } catch (err) {
            this.cli.info(err)
        }
    }

    @Command('discover', {
        desc: 'discover prime numbers'
    })
    async primeDiscover(): Promise<void> {
        try {
            this.cli.info(`\nMaior primo conhecido ${this.primeService.max}`)
            const ln = this.primeService.list.length
            this.primeService.discover()
            this.cli.info(`\nDiscover de números primos concluídos, ${this.primeService.list.length - ln} descobertos`)
            this.cli.info(`\n${this.primeService.max} é o novo maior primo conhecido`)
            this.cli.info(`\nÉ seguro fatorar com primos até ${this.primeService.max * this.primeService.max}\n`)
        } catch (err) {
            this.cli.info(err)
        }
    }
}
