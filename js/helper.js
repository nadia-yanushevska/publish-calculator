import { fieldContainer, calcForm, FIELDSET_NAME } from './ref.js';
import { onAddClick } from './main.js';

export function clearFieldSet() {
    try {
        fieldContainer.querySelector('[data-a-input]').value = '10.5';
        fieldContainer.querySelector('[data-b-input]').value = '';
        fieldContainer.querySelector('[data-quantity-input]').value = '';
    } catch (error) {
        console.log('Element not found.');
    }
}

export function clearForm() {
    [...fieldContainer.querySelectorAll('[data-js-added]')].forEach(elem => fieldContainer.removeChild(elem));

    calcForm.reset();
    onAddClick();
}

export function getNextElement(currElem, elements) {
    if (currElem.nodeName === 'SPAN') return elements.find(elem => elem.dataset.hasOwnProperty('jsSubmit'));

    let index = elements.findIndex(elem => elem === currElem) + 1;

    // if index exceeds array.length set it to 0
    if (index >= elements.length) index = 0;

    // if elem is fieldset update index
    if (elements[index].nodeName === FIELDSET_NAME) elements[index].dataset.hasOwnProperty('jsAdded') ? (index += 2) : index++;

    return elements[index];
}

export function setAValue(value) {
    [...fieldContainer.querySelectorAll('[data-a-input]')].forEach(elem => (elem.value = value));
}
