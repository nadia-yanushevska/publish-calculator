const translations = {
    format: {
        displayName: 'Формат',
        suffix: '',
    },
    pages: {
        displayName: 'Текст',
        suffix: 'стор.',
    },
    symbols: {
        displayName: 'Обсяг',
        suffix: 'тис. зн.',
    },
    a: {
        displayName: 'Ширина ілюстр.',
        suffix: 'см',
    },
    b: {
        displayName: 'Висота ілюстр.',
        suffix: 'см',
    },
    quantity: {
        displayName: 'Кількість  ілюстр.',
        suffix: '',
    },
    ov: {
        displayName: 'Обл.-вид.',
        suffix: '',
    },
    yda: {
        displayName: 'Ум. д. а.',
        suffix: '',
    },
};
// Class for translations and format
class Property {
    propName;
    displayName;
    nameSuffix;

    constructor(propName, displayName, nameSuffix) {
        this.propName = propName;
        this.displayName = displayName;
        this.nameSuffix = nameSuffix;
    }
}

const properties = [new Property('format', 'Формат', '')];
