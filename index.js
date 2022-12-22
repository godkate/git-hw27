const form = document.querySelector('form');
const input = document.querySelector('input');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');

form.onchange = ({ target }) => {
    if (target.matches('input')) {
        validateInput(target);
    }
};
form.onsubmit = (event) => {
    event.preventDefault();
    const elements = [...form.elements];

    const isValid = elements.reduce((acc, elem) => {
        if (elem.matches('input')) {
            const isValidField = validateInput(elem);
            if (!isValidField) elem.focus();

            return acc ? isValidField : acc;
        }
        return acc;
    }, true);
    const nameValue = form.elements.name.value;
    const lastNameValue = form.elements.lastName.value;
    const dateValue = form.elements.dateOfBirth.value;
    const genderValue = form.elements.gender.value;
    const cityValue = form.elements.city.value;
    const addressValue = form.elements.address.value;
    const languageValue = languagesValue();

    function languagesValue () {
        const value = [];
        const checkBox = document.getElementsByName('language');
        checkBox.forEach((elem) => {
            if (elem.checked) {
                value.push(elem.value);
            }
        });
        return value.join(', ');
    }
    renderRow(nameValue, lastNameValue, dateValue, genderValue, cityValue, addressValue, languageValue);
    form.classList.add('hide');
    table.classList.remove('hide');
};
input.focus();

/**
 * @param {HTMLInputElement} input
 * @return {boolean}
 */
function validateInput (input) {
    const { value, type, required, minLength, maxLength, nextElementSibling: validationMessage } = input;

    function showError (text) {
        input.classList.add('is-invalid');
        validationMessage.classList.add('invalid-feedback');
        validationMessage.innerText = text;
    }
    function showSuccess () {
        if (type === 'text') {
            validationMessage.classList.remove('invalid-feedback');
            validationMessage.innerText = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }

    }
    if (required && value === '') {
        showError('This field is required');
        return false;
    }
    if (!required && value === '' && type === 'text') {
        showSuccess();
        return true;
    }
    if (minLength && value.length < minLength && type === 'text') {
        showError(`This field should has minimum ${minLength} symbols`);
        return false;
    }
    if (maxLength && value.length > maxLength && type === 'text') {
        showError(`This field should has maximum ${maxLength} symbols`);
        return false;
    }
    showSuccess();
    return true;
}
function renderRow (name, lastName, dateOfBirth, gender, city, address, language) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${name}</td>
    <td>${lastName}</td>
    <td>${dateOfBirth}</td>
    <td>${gender}</td>
    <td>${city}</td>
    <td>${address}</td>
    <td>${language}</td>
    `;
    tbody.append(row);
}

