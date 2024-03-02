import { formCheckbox } from './ref.js';
import { calculateOV, calculateYDA } from './calculator.js';
import { getFormatValue, getFormatData, FORMAT_A_KEY } from './format.js';

export function getData(elems, fieldArray) {
    const {
        format: { value: standart },
        pages: { value: pagesStr },
        'text-symbols': { value: symbolsStr },
    } = elems;

    const format = getFormatValue(standart);
    const pages = +pagesStr || 0;
    const symbols = +symbolsStr || 0;

    let A4toA5 = standart === 'st-1' ? formCheckbox.checked : false;

    const a = A4toA5 ? 16 : getFormatData(format, FORMAT_A_KEY);
    const b = [];
    const quantity = [];

    fieldArray.forEach(elem => {
        b.push(+elem.elements.b.value || 0);
        quantity.push(+elem.elements.quantity.value || 0);
    });

    if (!A4toA5) return { format, pages, symbols, a, b, quantity };

    return { format, pages, symbols, a, b, quantity, A4toA5 };
}

export function getComputedData(input) {
    const computed = {};
    computed.ov = calculateOV(input);
    computed.yda = calculateYDA(input);
    return computed;
}
