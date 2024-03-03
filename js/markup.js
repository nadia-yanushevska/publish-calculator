export const HIDDEN_CLASS = 'hidden-elements';

const OBJ_TYPE = 'object';

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
    const valueStr = typeof propArr[1] === OBJ_TYPE ? propArr[1].join(', ') : propArr[1];
    return `<li class="data-li">${propArr[0]}: <strong>${valueStr}</strong></li>`;
}
