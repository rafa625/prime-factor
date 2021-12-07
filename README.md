## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## CLI
```bash
# lista os comandos
$ node cli list

# fatora com primos um número fornecido
$ node cli factor

# busca por novos números primos
$ node cli discover
```

## CLI
```bash
# lista os comandos
$ node cli list

# fatora com primos um número fornecido
$ node cli factor

# busca por novos números primos
$ node cli discover
```

## API
```bash
# fatora com primos um número fornecido
# retorna fatores primos e lista de divisores
$ curl --request GET \ --url http://localhost:3003/factor/1682022777525

# busca por novos números primos
# retorna maior primo encontrado
$ curl --request GET \ --url http://localhost:3003/prime/discover
```
