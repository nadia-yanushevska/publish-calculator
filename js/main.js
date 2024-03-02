import { getFormatData, getFormatValue, calculateOV, calculateYDA } from './calculator.js';

const iterator = 1;

const body = document.body;
const calcForm = body.querySelector('[data-calc-form]');
const formatSelection = calcForm.querySelector('[data-format-input]');
const fieldContainer = calcForm.querySelector('[data-field-container]');
const formCheckbox = calcForm.querySelector('[data-checkbox]');
const addBtn = calcForm.querySelector('[data-add-field]');

const resultsElem = body.querySelector('[data-results]');
const resultInput = body.querySelector('[data-input]');
const resultOutput = body.querySelector('[data-output]');

calcForm.addEventListener('submit', onFormSubmit);
formatSelection.addEventListener('change', onFormatSelect);
addBtn.addEventListener('click', onAddClick);

function getData(elems, fieldArray) {
    const {
        format: { value: standart },
        pages: { value: pagesStr },
        'text-symbols': { value: symbolsStr },
    } = elems;

    const format = getFormatValue(standart);
    const pages = +pagesStr;
    const symbols = +symbolsStr;

    const a = getFormatData(format, 'a');
    const b = [];
    const quantity = [];

    fieldArray.forEach(elem => {
        b.push(+elem.elements.b.value);
        quantity.push(+elem.elements.quantity.value);
    });

    let A4toA5 = formCheckbox.checked;

    return { format, pages, symbols, a, b, quantity, A4toA5 };
}

function getComputedData(input) {
    const computed = {};
    computed.ov = calculateOV(input);
    computed.yda = calculateYDA(input);
    return computed;
}

function getDataMarkup(obj) {
    const entries = Object.entries(obj);
    return entries.map(dataTemplate).join('\n');
}

function dataTemplate(propArr) {
    return `<li class="data-li">${propArr[0]}: <strong>${propArr[1]}</strong></li>`;
}

// onClick responses:
function onFormSubmit(e) {
    e.preventDefault();

    let formData = getData(calcForm.elements, [...calcForm.querySelectorAll('[data-js-added]')]);
    let resultData = getComputedData(formData);

    resultInput.innerHTML = getDataMarkup(formData);
    resultOutput.innerHTML = getDataMarkup(resultData);

    resultsElem.classList.remove('hidden-elements');

    [...fieldContainer.querySelectorAll('[data-js-added]')].forEach(elem => fieldContainer.removeChild(elem));
    onAddClick();

    e.target.reset();
    formData = {};
    resultData = {};
    onFormatSelect();
}

function onFormatSelect() {
    const formatName = formatSelection.selectedOptions[0].value;
    const formatVal = getFormatValue(formatName);
    const formatA = getFormatData(formatVal, 'a');

    const aElems = [...fieldContainer.querySelectorAll('[data-a-input]')];
    aElems.forEach(elem => (elem.value = formatA));

    if (formatName === 'st-2') {
        formCheckbox.parentElement.classList.remove('hidden-elements');
    } else {
        formCheckbox.parentElement.classList.add('hidden-elements');
    }
}

function onAddClick() {
    const markup = `<fieldset class="column-container" data-js-added>
                        <label class="form-lables" for="a">a <input class="form-inputs list-input" name="a" id="a" type="number" disabled  value="10.5" step=".5"  data-a-input /></label>
                        <label class="form-lables" for="b">b <input class="form-inputs list-input" name="b" id="b" type="number" min="0" step=".5" /></label>
                        <label class="form-lables" for="quantity">Quantity <input class="form-inputs list-input" name="quantity" id="quantity" type="number" min="0" /></label>
                    </fieldset>`;
    fieldContainer.insertAdjacentHTML('beforeend', markup);
    onFormatSelect();
}
