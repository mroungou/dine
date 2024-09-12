const plusMinusBtn = [...document.getElementsByClassName('plus-minus-btn')]
let numberOfPeople = 2;
const email = document.getElementById('email');
const form = document.getElementById('form');
const dateInputs = document.querySelectorAll('.date-input');
const timeInputs = document.querySelectorAll('.time-input');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

// the error message that will be displayed if the user inputs aren't valid
const validationMessage = {
    'empty': 'This field is required',
    'incomplete': 'This field is incomplete',
    'email': 'Please enter a valid email',
    'invalid': 'Please enter a valid date',
    'past': 'Please enter a date in the future',
}

// depending on the btn that is clicked it will either ++/-- the reservation number
plusMinusBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        updateReserveNumber(btn.id)
    })
})

const updateReserveNumber = (btnId) => {
    const reserveNumber = document.getElementById('number');

    if (btnId === 'plus-btn') {
       numberOfPeople ++;
    } else {
        numberOfPeople --;
    }
    reserveNumber.innerText = limitNumber(numberOfPeople);
}

// this function limits the reservation # between 2 and 20
const limitNumber = (num, min, max) => {
    const MIN = min ?? 2;
    const MAX = max ?? 20;
    const number = num;

    return Math.min(Math.max(number, MIN), MAX);
}

// validates the inputs of the user
const validateInputs = () => {

    isEmailValid(email.value);
    validDate();
    validTime();

    if (nameInput.value === '') {
        hasError(nameInput.parentElement, validationMessage.empty)
    } else {
        hasNoError(nameInput.parentElement)
    }
}
// handles the displaying of error states of the elements
// takes two args - the parent ele and the message to be displayed depending on the situation
const hasError = (element, message) => {
    const errorDiv = element.querySelector('.error-div');
    element.classList.add('has-error');
    errorDiv.innerText = message;
}
// handles removing error states after the user enters invalid info and info is now valid
const hasNoError = (element) => {
    const errorDiv =  element.querySelector('.error-div')
    errorDiv.innerText = ''

    element.classList.remove('has-error');

}
// verifies the email to make and calls the hasError or hasNoError depending on the state
const isEmailValid = (emailValue) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // will return true if the email entered is valid
    const validEmail = regex.test(emailValue);

    if (emailValue === '') {
        hasError(email.parentElement, validationMessage.empty);
    } else if (!validEmail) {
        hasError(email.parentElement, validationMessage.email)
    } else {
        hasNoError(email.parentElement)
    }
}

const validDate = () => {
    // empty object will contain the info about the date entered by the user
    const dateData = {}
    // this goes through the nodelist and the key will be the name of the field
    // the value will be the value that user entered
    for (const field of dateInputs) {
        dateData[field.name] = field.value;
    }

    const dateDiv = document.getElementById('date');
    // parsing the info from user - will be used to validate the date
    const reservationDate = Date.parse(`${dateData.year}-${dateData.month}-${dateData.day}`)
    // will also be used to determine if it's a valid date
    // this will return the num of ms since 1jan 1970 - if invalid the date isn't a date
    const reservationDateValid = new Date(reservationDate);
    // getting today's date to make sure that the date isn't in the past
    const dateToday = Date.now()

    /* 
    Object.values() creates an array with the values of the dateDate obj
    .some() method will check if any of the values in the array created by the Obj.values() passes the test
    the test in this case is (value => !value) - either the value is null, undfined, empy str
    it will return true or false
    */
    const missingValues = Object.values(dateData).some(value => !value);

    // another approach to the one above
    /*
    for (const dateInput in dateData) {
        if(!dateData[dateInput]) {
            missingValues = true;
            break;
        }
    }
    */

    if (missingValues) {
        hasError(dateDiv, validationMessage.empty);
    } else if (reservationDate < dateToday) {
        hasError(dateDiv, validationMessage.past)
    } else if (isNaN(reservationDateValid)) {
        hasError(dateDiv, validationMessage.invalid);
    } else {
        hasNoError(dateDiv);
    }
}

const validTime = () => {
    // logic is the same as date but less complex
    const timeDiv = document.getElementById('time');

    let timeData = {}
    for (const field of timeInputs) {
        timeData[field.id] = field.value;
    }
    
    const missingValues = Object.values(timeData).some(value => !value);
    
    if (missingValues) {
        hasError(timeDiv, validationMessage.incomplete)
    } else {
        hasNoError(timeDiv);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    
        validateInputs();
    })
})