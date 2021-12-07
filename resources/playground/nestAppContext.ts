import { NestApplicationOptions } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import FactorService from "src/factor/factor.service";
import AppModule from "../../src/app.module";


const bootstrap = async (): Promise<void> => {
    const app = await NestFactory.createApplicationContext(
        AppModule
    )

    const configService = app.get(ConfigService)
    const API_PORT = configService.get<number>('API_PORT')
    const LOGGER_FORMAT = configService.get<string>('LOGGER_FORMAT')

    const factor = app.get(FactorService)
    factor.start(100)



}

bootstrap()
