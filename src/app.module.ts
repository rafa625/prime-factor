import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import FactorModule from './factor/factor.module'
import MyConsoleModule from './myConsole/myConsole.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    FactorModule,
    MyConsoleModule
  ],
  controllers: [],
  providers: [FactorModule],
})
export default class AppModule { }
