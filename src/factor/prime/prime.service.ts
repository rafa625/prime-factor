import { Injectable } from '@nestjs/common'
import PrimeRepository from './prime.repository'

@Injectable()
export default class PrimeService {
    private $list: number[]
    private $target: number
    private $loopSize: number
    private $max: number
    private $horizon: number

    constructor(
        private readonly primeRepository: PrimeRepository
    ) {
        this.$list = this.primeRepository.all()
        this.$loopSize = 1000000
        this.$max = this.$list[this.$list.length - 1]
        this.$horizon = this.$max * this.$max
    }

    public get list(): number[] {
        return this.$list
    }

    public get max(): number {
        return this.$max
    }

    public discover(): void {
        let availableFactors = []

        if (this.$max + this.$loopSize > this.$horizon) {
            this.$target = this.$horizon
            availableFactors = this.$list
        } else {
            this.$target = this.$max + this.$loopSize
            const m1 = Math.floor(Math.sqrt(this.$target))
            for (let it = 0; this.$list[it] <= m1; it += 1) {
                availableFactors.push(this.$list[it])
            }
        }

        for (let it = this.$max + 2; it <= this.$target; it += 2) {
            let divisible = false

            for (let el = 0; el < availableFactors.length; el += 1) {
                const f1 = availableFactors[el]
                if (it % f1 === 0) {
                    divisible = true
                }
                if (divisible) break
            }

            if (divisible) continue
            this.$list.push(it)
            this.$max = this.$list[this.$list.length - 1]
            this.$horizon = this.$max * this.$max
        }

        this.primeRepository.save = this.$list
    }
}
