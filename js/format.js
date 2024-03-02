export const FORMAT_MULT_KEY = 'illSpaceMultiplier';
export const FORMAT_A_KEY = 'a';
export const FORMAT_LOT_KEY = 'lot';

export const formats = [
    {
        fName: 'st-1',
        value: '60 × 84 / 16',
        x: 60,
        y: 84,
        lot: 16,
        a: 10.5,
        illSpaceMultiplier: 1,
    },
    {
        fName: 'st-2',
        value: '60 × 84 / 8',
        x: 60,
        y: 84,
        lot: 8,
        a: 16,
        illSpaceMultiplier: 1,
    },
    {
        fName: 'st-3',
        value: '70 × 100 / 16',
        x: 70,
        y: 100,
        lot: 16,
        a: 14,
        illSpaceMultiplier: 0.655,
    },
    {
        fName: 'st-4',
        value: '84 × 108 / 32',
        x: 84,
        y: 108,
        lot: 32,
        a: 9.5,
        illSpaceMultiplier: 0.655,
    },
];

export function getFormatData(formatValue, findKey) {
    return formats.find(elem => elem.value === formatValue)[findKey];
}

export function getFormatValue(formatName) {
    return formats.find(elem => elem.fName === formatName).value;
}
