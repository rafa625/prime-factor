import { JsonDB } from 'node-json-db'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export default class PrimeRepository {
    private name: string

    constructor(
        @Inject('JsonDatabase')
        private readonly db: JsonDB
    ) {
        this.name = '/primes'
    }

    public set save(list: number[]) {
        this.db.push(this.name, list)
        this.db.save()
    }

    public all(): number[] {
        return this.db.getData(this.name)
    }
}
