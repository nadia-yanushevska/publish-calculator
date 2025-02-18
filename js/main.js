import { calcForm, formatSelection, addBtn, resetBtn, fieldContainer, formCheckbox, resultsElem, resultInput, resultOutput, ENTER_KEY, BUTTON_NAME } from './ref.js';
import { getData, getComputedData } from './data.js';
import { getFormatData, getFormatValue, FORMAT_A_KEY } from './format.js';
import { HIDDEN_CLASS, getFieldSetMarkup, getDataMarkup } from './markup.js';
import { clearFieldSet, clearForm, getInitElement, getNextElement, setAValue } from './helper.js';

document.addEventListener('keydown', onEnterPress);
calcForm.addEventListener('submit', onFormSubmit);

formatSelection.addEventListener('change', onFormatSelect);
formCheckbox.addEventListener('change', onCheckbox);
addBtn.addEventListener('click', onAddClick);
resetBtn.addEventListener('click', onReset);

let B_ITERATOR = 1;
getInitElement().focus();

function onEnterPress(e) {
    if (e.target.nodeName === 'SPAN' && e.code === 'Space') {
        e.preventDefault();
        formCheckbox.checked = !formCheckbox.checked;
    }
    if (e.key === ENTER_KEY && e.target.nodeName !== BUTTON_NAME) {
        const nextElem = getNextElement(e.target, [...calcForm.elements]);

        e.preventDefault();
        nextElem.focus();
    }
}

function onReset(e) {
    e.preventDefault();

    clearFieldSet();
    clearForm();
    getInitElement().focus();
    
    resultsElem.classList.add(HIDDEN_CLASS);
}

function onFormSubmit(e) {
    e.preventDefault();

    let formData = getData(calcForm.elements, [...calcForm.querySelectorAll('[data-js-added]')]);
    let resultData = getComputedData(formData);

    resultInput.innerHTML = getDataMarkup(formData);
    resultOutput.innerHTML = getDataMarkup(resultData);
    resultsElem.classList.remove(HIDDEN_CLASS);

}

function onFormatSelect() {
    const formatName = formatSelection.selectedOptions[0].value;
    const formatVal = getFormatValue(formatName);
    const formatA = getFormatData(formatVal, FORMAT_A_KEY);

    setAValue(formatA);

    if (formatName === 'st-1') {
        formCheckbox.parentElement.classList.remove(HIDDEN_CLASS);
        formCheckbox.addEventListener('change', onCheckbox);
    } else {
        formCheckbox.parentElement.classList.add(HIDDEN_CLASS);
        formCheckbox.removeEventListener('change', onCheckbox);
        formCheckbox.checked = false;
    }
}

function onCheckbox(e) {
    const aValueChecked = 16;
    const aValueNotChecked = 10.5;

    if (e.target.checked) {
        setAValue(aValueChecked);
    } else {
        setAValue(aValueNotChecked);
    }
}

export function onAddClick() {
    fieldContainer.insertAdjacentHTML('beforeend', getFieldSetMarkup(B_ITERATOR));

    const focusInput = fieldContainer.querySelector(`[data-js-focus='${B_ITERATOR}']`);
    if (B_ITERATOR !== 0) focusInput.focus();

    B_ITERATOR++;

    onFormatSelect();
}
