const formats = [
    {
        fName: 'st-1',
        value: '60 × 84 / 16',
        x: 60,
        y: 84,
        lot: 16,
        a: 10.5,
    },
    {
        fName: 'st-2',
        value: '60 × 84 / 8',
        x: 60,
        y: 84,
        lot: 8,
        a: 16,
    },
    {
        fName: 'st-3',
        value: '70 × 100 / 16',
        x: 70,
        y: 100,
        lot: 16,
        a: 14,
    },
    {
        fName: 'st-4',
        value: '84 × 108 / 32',
        x: 84,
        y: 108,
        lot: 32,
        a: 9.5,
    },
];

export function calculateOV({ format, symbols = 0, b, quantity, A4toA5 = false }) {
    const a = getFormatData(format, 'a');
    let illustrationSpace = quantity.reduce((acc, q, idx) => acc + a * q * b[idx], 0);
    console.log(illustrationSpace, a);
    if (A4toA5) {
        illustrationSpace /= 2;
    }
    return roundUp(symbols / 40 + illustrationSpace / 3000, 2);
}

export function calculateYDA({ format, pages }) {
    const lotValue = getFormatData(format, 'lot');
    const fda = pages / lotValue;
    const x = getFormatData(format, 'x');
    const y = getFormatData(format, 'y');
    const yda = (fda * x * y) / 5400;
    return roundData(yda, 3);
}

export function getFormatData(formatValue, findKey) {
    return formats.find(elem => elem.value === formatValue)[findKey];
}

export function getFormatValue(formatName) {
    return formats.find(elem => elem.fName === formatName).value;
}

// digits - number of digits after decimal point
export function roundUp(num, digits) {
    const multiplier = Math.pow(10, digits);
    return Math.ceil(num * multiplier) / multiplier;
}

export function roundData(num, digits) {
    const multiplier = Math.pow(10, digits);
    return Math.round(num * multiplier) / multiplier;
}
