import { calcForm, formatSelection, addBtn, fieldContainer, formCheckbox, resultsElem, resultInput, resultOutput } from './ref.js';
import { getData, getComputedData } from './data.js';
import { getFormatData, getFormatValue, FORMAT_A_KEY } from './format.js';
import { fieldSetMarkup, getDataMarkup } from './markup.js';

calcForm.addEventListener('submit', onFormSubmit);
formatSelection.addEventListener('change', onFormatSelect);
addBtn.addEventListener('click', onAddClick);

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
    const formatA = getFormatData(formatVal, FORMAT_A_KEY);

    const aElems = [...fieldContainer.querySelectorAll('[data-a-input]')];
    aElems.forEach(elem => (elem.value = formatA));

    if (formatName === 'st-1') {
        formCheckbox.parentElement.classList.remove('hidden-elements');
    } else {
        formCheckbox.parentElement.classList.add('hidden-elements');
    }
}

function onAddClick() {
    fieldContainer.insertAdjacentHTML('beforeend', fieldSetMarkup);
    onFormatSelect();
}
