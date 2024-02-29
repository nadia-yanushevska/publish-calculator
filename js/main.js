const formats = {
    'standart-1': '60 × 84 / 16',
    'standart-2': '60 × 84 / 8',
    'standart-3': '70 × 100 / 16',
    'standart-4': '84 × 108 / 32',
};

const body = document.body;
const calcForm = body.querySelector('[data-calc-form]');

const calcCheckbox = calcForm.querySelector('[data-calc-checkbox]');
const calcFieldSet = calcForm.querySelector('[data-calc-fieldset]');
if (calcCheckbox.checked) calcFieldSet.classList.remove('hidden-elements');

const resultsElem = body.querySelector('[data-results]');
const resultInput = body.querySelector('[data-input]');
const resultOutput = body.querySelector('[data-result]');

calcCheckbox.addEventListener('change', onCheckboxChange);
calcForm.addEventListener('submit', onFormSubmit);

function getData(elems) {
    const {
        format: { value: standart },
        pages: { value: pages },
        fda: { value: fda },
        yda: { value: yda },
        'text-symbols': { value: symbols },
        illustrations: { value: illustrations },
        'view-scope': { value: scope },
        special: { checked: special },
    } = elems;

    const format = formats[standart];

    if (special) {
        const {
            a: { value: a = 0 },
            b: { value: b = 0 },
            quantity: { value: quantity = 0 },
        } = elems;

        return { format, pages, fda, yda, symbols, illustrations, scope, a, b, quantity };
    }
    return { format, pages, fda, yda, symbols, illustrations, scope };
}

function calculateInvoice(data) {
    return 'xxx';
}

function getDataMarkup(obj) {
    const entries = Object.entries(obj);
    return entries.map(dataTemplate).join('\n');
}

function dataTemplate(propArr) {
    return `<li class="data-li">${propArr[0]}: ${propArr[1]}</li>`;
}

// onClick responses:
function onFormSubmit(e) {
    e.preventDefault();

    const formData = getData(calcForm.elements);
    const result = calculateInvoice(formData);

    resultInput.innerHTML = getDataMarkup(formData);
    resultOutput.innerHTML = result;

    resultsElem.classList.remove('hidden-elements');

    e.target.reset();
}

function onCheckboxChange(e) {
    calcFieldSet.classList.toggle('hidden-elements');
}
