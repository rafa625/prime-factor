import { BadRequestException, Injectable } from '@nestjs/common'
import NumberSort from '../commons/functions/numberSort'
import PrimeRepository from './prime/prime.repository'

@Injectable()
export default class FactorService {
    private $primes: number[]

    private $n: number
    private $numDividers: number
    private $factors: number[]
    private $dividers: number[]
    private $primesDividers: number[]
    private $maxDivider: number
    private $availableFactors: number[]
    private $isPrime: boolean
    private $maxPrime: number
    private $horizon: number

    constructor(private readonly primesRepository: PrimeRepository) {
        this.$primes = this.primesRepository.all()
        this.$maxPrime = this.$primes[this.$primes.length - 1]
        this.$horizon = this.$maxPrime * this.$maxPrime
        this.clear()
    }

    public get factors(): number[] {
        return this.$factors
    }

    private clear(): void {
        this.$numDividers = 0
        this.$factors = []
        this.$dividers = []
        this.$primesDividers = []
        this.$maxDivider = 0
        this.$availableFactors = []
        this.$isPrime = false
    }

    public get primes(): number[] {
        return this.$primes
    }

    public start(num: number): void {
        this.$n = num
        this.clear()

        this.$maxDivider = Math.floor(this.$n / 2)
        this.setAvailableFactors()

        this.factore(this.$n)

        this.calculateNumDividers()

        this.listDividers()
        this.listPrimesDividers()
    }

    private validate(num: number): boolean {
        return this.$horizon > num
    }

    private factore(num: number): void {
        if (!this.validate(num)) {
            let msg = `We would need to know prime numbers up to ${Math.floor(Math.sqrt(num))}. `
            msg += `However the biggest we know so far is ${this.$maxPrime}.`
            throw new BadRequestException(msg)
        }

        let n1 = num
        while (n1 > 1) {
            let changed = false
            for (let it = 0; it < this.$availableFactors.length; it += 1) {
                const prime = this.$availableFactors[it]
                if (n1 % prime === 0) {
                    this.$factors.push(prime)
                    n1 = n1 / prime
                    it = this.$availableFactors.length
                    changed = true
                    this.$isPrime = false
                }
            }

            if (!changed) {
                this.addPrime(n1)
            }

            if (n1 === num) {
                this.$isPrime = true
                this.addPrime(num)
                n1 = 1
            }
        }
    }

    private addPrime(num: number): void {
        if (this.primes.indexOf(num) === -1) this.primes.unshift(num)
        this.$primes.sort(NumberSort)
        this.setAvailableFactors()
    }

    private setAvailableFactors(): void {
        this.$availableFactors = this.$primes.filter((el) => el < this.$maxDivider)
    }

    private calculateNumDividers(): void {
        const factorsExpos = []
        this.$factors.forEach((el) => {
            if (factorsExpos[el] === undefined) {
                factorsExpos[el] = 2
            } else {
                factorsExpos[el] += 1
            }
        })
        const multReducer = (prev, curr): number => prev * curr
        this.$numDividers = this.$isPrime ? 2 : factorsExpos.reduce(multReducer)
    }

    public get numDividers(): number {
        return this.$numDividers
    }

    private listDividers(): void {
        this.$dividers.unshift(1)
        this.$factors.forEach((factor) => {
            this.$dividers.forEach((divider) => {
                const it = factor * divider
                if (this.$dividers.indexOf(it) === -1) {
                    this.$dividers.push(it)
                }
            })
        })
        if (this.$dividers.length === 1) this.$dividers.push(this.$n)
        this.$dividers.sort(NumberSort)
    }

    public get dividers(): number[] {
        return this.$dividers
    }

    private listPrimesDividers(): void {
        this.$factors.forEach((factor) => {
            if (this.$primesDividers.indexOf(factor) === -1) {
                this.$primesDividers.push(factor)
            }
        })

        if (this.$isPrime) this.$primesDividers.push(this.$n)
    }

    public get primesDividers(): number[] {
        return this.$primesDividers
    }
}
