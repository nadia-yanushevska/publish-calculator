export const HIDDEN_CLASS = 'hidden-elements';

const OBJ_TYPE = 'object';

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
    A4toA5: {
        displayName: 'Друк А4 на А5',
        suffix: '',
    },
};

export const fieldSetMarkup = `<fieldset class="column-container" data-js-added>
                        <label class="form-lables" for="a">a <input class="form-inputs list-input" name="a" id="a" type="number" disabled  value="10.5" step=".5"  data-a-input /></label>
                        <label class="form-lables" for="b">b <input class="form-inputs list-input" name="b" id="b" type="number" min="0" step=".5" /></label>
                        <label class="form-lables" for="quantity">Quantity <input class="form-inputs list-input" name="quantity" id="quantity" type="number" min="0" /></label>
                    </fieldset>`;

export function getDataMarkup(obj) {
    const entries = Object.entries(obj);
    return entries.map(dataTemplate).join('\n');
}

function dataTemplate(propArr) {
    let valueStr = typeof propArr[1] === OBJ_TYPE ? propArr[1].join(', ') : typeof propArr[1] === 'boolean' ? 'да' : propArr[1];

    return `<li class="data-li">${translations[propArr[0]].displayName}: <strong>${valueStr}</strong> ${translations[propArr[0]].suffix}</li>`;
}
