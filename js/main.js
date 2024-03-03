import { calcForm, formatSelection, addBtn, fieldContainer, formCheckbox, resultsElem, resultInput, resultOutput, ENTER_KEY, BUTTON_NAME, FIELDSET_NAME, CHECKBOX_TYPE } from './ref.js';
import { getData, getComputedData } from './data.js';
import { getFormatData, getFormatValue, FORMAT_A_KEY } from './format.js';
import { HIDDEN_CLASS, fieldSetMarkup, getDataMarkup } from './markup.js';

document.addEventListener('keydown', onEnterPress);
calcForm.addEventListener('submit', onFormSubmit);
formatSelection.addEventListener('change', onFormatSelect);
addBtn.addEventListener('click', onAddClick);

function onEnterPress(e) {
    if (e.key === ENTER_KEY && e.target.nodeName !== BUTTON_NAME) {
        const nextElem = getNextElement(e.target, [...calcForm.elements]);

        // if elem is checkbox do default
        if (nextElem.type !== CHECKBOX_TYPE) {
            e.preventDefault();
            nextElem.focus();
        }
    }
}

function onFormSubmit(e) {
    e.preventDefault();

    let formData = getData(calcForm.elements, [...calcForm.querySelectorAll('[data-js-added]')]);
    let resultData = getComputedData(formData);

    resultInput.innerHTML = getDataMarkup(formData);
    resultOutput.innerHTML = getDataMarkup(resultData);
    resultsElem.classList.remove(HIDDEN_CLASS);

    formData = {};
    resultData = {};

    clearFieldSet();
    clearForm();
}

function onFormatSelect() {
    const formatName = formatSelection.selectedOptions[0].value;
    const formatVal = getFormatValue(formatName);
    const formatA = getFormatData(formatVal, FORMAT_A_KEY);

    const aElems = [...fieldContainer.querySelectorAll('[data-a-input]')];
    aElems.forEach(elem => (elem.value = formatA));

    if (formatName === 'st-1') {
        formCheckbox.parentElement.classList.remove(HIDDEN_CLASS);
    } else {
        formCheckbox.parentElement.classList.add(HIDDEN_CLASS);
    }
}

function onAddClick() {
    fieldContainer.insertAdjacentHTML('beforeend', fieldSetMarkup);
    onFormatSelect();
}

function clearFieldSet() {
    try {
        fieldContainer.querySelector('[data-a-input]').value = '10.5';
        fieldContainer.querySelector('[data-b-input]').value = '';
        fieldContainer.querySelector('[data-quantity-input]').value = '';
    } catch (error) {
        console.log('Element not found.');
    }
}

function clearForm() {
    [...fieldContainer.querySelectorAll('[data-js-added]')].forEach(elem => fieldContainer.removeChild(elem));

    calcForm.reset();
    onAddClick();
}

function getNextElement(currElem, elements) {
    let index = elements.findIndex(elem => elem === currElem) + 1;

    // if index exceeds array.length set it to 0
    if (index >= elements.length) index = 0;

    // if elem is fieldset update index
    if (elements[index].nodeName === FIELDSET_NAME) elements[index].dataset.hasOwnProperty('jsAdded') ? (index += 2) : index++;

    return elements[index];
}
