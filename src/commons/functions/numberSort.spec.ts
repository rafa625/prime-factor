import NumberSort from './numberSort'

describe('NumberSort', () => {
    it('should compare two equals numbers', () => {
        expect(NumberSort(1, 1)).toStrictEqual(0)
    })

    it('the first parameter must be greater than the second', () => {
        expect(NumberSort(1, 0)).toStrictEqual(1)
    })

    it('the second parameter must be greater than the first', () => {
        expect(NumberSort(0, 1)).toStrictEqual(-1)
    })
})
