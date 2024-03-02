import { getFormatData, FORMAT_MULT_KEY, FORMAT_LOT_KEY } from './format.js';

export function calculateOV({ format, symbols, a, b, quantity, A4toA5 = false }) {
    let illustrationSpace = quantity.reduce((acc, q, idx) => acc + a * q * b[idx], 0);
    if (A4toA5) {
        illustrationSpace /= 2;
    } else illustrationSpace *= getFormatData(format, FORMAT_MULT_KEY);
    return roundUp(symbols / 40 + illustrationSpace / 3000, 2);
}

export function calculateYDA({ format, pages }) {
    const lotValue = getFormatData(format, FORMAT_LOT_KEY);
    const fda = pages / lotValue;
    const x = getFormatData(format, 'x');
    const y = getFormatData(format, 'y');
    const yda = (fda * x * y) / 5400;
    return roundData(yda, 3);
}

// digits - number of digits after decimal point
function roundUp(num, digits) {
    const multiplier = Math.pow(10, digits);
    return Math.ceil(num * multiplier) / multiplier;
}

function roundData(num, digits) {
    const multiplier = Math.pow(10, digits);
    return Math.round(num * multiplier) / multiplier;
}
