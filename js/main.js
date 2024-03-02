import { calcForm, formatSelection, addBtn, fieldContainer, formCheckbox, resultsElem, resultInput, resultOutput } from './ref.js';
import { getData, getComputedData } from './data.js';
import { getFormatData, getFormatValue, FORMAT_A_KEY } from './format.js';
import { HIDDEN_CLASS, fieldSetMarkup, getDataMarkup } from './markup.js';

calcForm.addEventListener('submit', onFormSubmit);
formatSelection.addEventListener('change', onFormatSelect);
addBtn.addEventListener('click', onAddClick);

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
