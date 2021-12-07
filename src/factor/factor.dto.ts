import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export default class FactorDto {
    @IsNumber()
    @Type(() => Number)
    number: number
}
