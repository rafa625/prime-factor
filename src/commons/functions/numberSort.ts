const NumberSort = (num1: number, num2: number): number => {
    if (num1 > num2) return 1
    if (num1 < num2) return -1
    return 0
}

export default NumberSort
