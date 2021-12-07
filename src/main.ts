import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import AppModule from './app.module'
import * as Morgan from 'morgan'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: process.env.LOGGER_LEVEL } })
  )
  const configService = app.get(ConfigService)
  const API_PORT = configService.get<number>('API_PORT')
  const LOGGER_FORMAT = configService.get<string>('LOGGER_FORMAT')

  const morgan = Morgan.default

  app.use(morgan(LOGGER_FORMAT))
  await app.listen(API_PORT)
}

bootstrap()
