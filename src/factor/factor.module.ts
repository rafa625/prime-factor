import { Module } from '@nestjs/common'
import { JsonDB } from 'node-json-db'
import { Config as JsonDBConfig } from 'node-json-db/dist/lib/JsonDBConfig'

import MyConsoleModule from 'src/myConsole/myConsole.module'
import FactorConsole from './factor.console'
import FactorService from './factor.service'
import FactorController from './factor.controller'
import PrimeService from './prime/prime.service'
import PrimeRepository from './prime/prime.repository'
import PrimeController from './prime/prime.controller'

@Module({
    imports: [MyConsoleModule],
    providers: [
        FactorConsole,
        PrimeService,
        PrimeRepository,
        FactorService,
        {
            provide: 'JsonDatabase',
            useFactory: (): JsonDB => {
                return new JsonDB(
                    new JsonDBConfig('data/local', false, false, '/')
                )
            }
        }
    ],
    controllers: [FactorController, PrimeController]
})
export default class FactorModule { }
