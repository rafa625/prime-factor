import { Module } from '@nestjs/common'
import { ConsoleModule, _cli } from '@squareboat/nest-console'

const Cli = {
    provide: 'Cli',
    useValue: _cli
}
@Module({
    imports: [ConsoleModule],
    providers: [Cli],
    exports: [
        ConsoleModule,
        Cli
    ]
})
export default class MyConsoleModule { }
