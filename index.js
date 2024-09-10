const occasionDiv = document.getElementById('occasion-div');
const eventsImgDiv = document.getElementById('events-img-div');
const eventsNav = [...document.getElementsByClassName('event')]; //spread operator to change to array
const plusMinusBtn = [...document.getElementsByClassName('plus-minus-btn')]
let numberOfPeople = 2;
const inputElements = document.querySelectorAll('input');
const email = document.getElementById('email');
const form = document.getElementById('form');
const dateInputs = document.querySelectorAll('.date-input');
const timeInputs = document.querySelectorAll('.time-input');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const eventsData = [ // array containg data for the occasion div
    {
        title: 'Family Gathering',
        text: `We love catering for entire families. So please bring everyone along for a special meal with your
                loved ones. We’ll provide a memorable experience for all.`,
        mobile: {
            src: './images/homepage/family-gathering-mobile.jpg',
            id: 'family-gathering-mobile',
            class: 'mobile',
            alt: 'Family Gathering'
        },

        tablet: {
            src: './images/homepage/family-gathering-tablet.jpg',
            id: 'family-gathering-tablet',
            class: 'tablet',
            alt: 'Family Gathering'
        },

        desktop: {
            src: './images/homepage/family-gathering-desktop.jpg',
            id: 'family-gathering-desktop',
            class: 'desktop',
            alt: 'Family Gathering'
        }
    },

    {
        title: 'Special Events',
        text: `Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you.
                We’ll be sure to mark your special date with an unforgettable meal.`,
        mobile: {
            src: './images/homepage/special-events-mobile.jpg',
            id: 'special-event-mobile',
            class: 'mobile',
            alt: 'Special Events'
        },

        tablet: {
            src: './images/homepage/special-events-tablet.jpg',
            id: 'special-event-tablet',
            class: 'tablet',
            alt: 'Special Events'
        },

        desktop: {
            src: './images/homepage/special-events-desktop.jpg',
            id: 'special-event-desktop',
            class: 'desktop',
            alt: 'Special Events'
        }
    },

    {
        title: 'Social Events',
        text: `Are you looking to have a larger social event? No problem! We’re more than happy to cater for big
                parties. We’ll work with you to make your event a hit with everyone.`,
        mobile: {
            src: './images/homepage/social-events-mobile.jpg',
            id: 'social-event-mobile',
            class: 'mobile',
            alt: 'Social Gathering'
        },

        tablet: {
            src: './images/homepage/social-events-tablet.jpg',
            id: 'social-event-tablet',
            class: 'tablet',
            alt: 'Social Gathering'
        },

        desktop: {
            src: './images/homepage/social-events-desktop.jpg',
            id: 'social-event-desktop',
            class: 'desktop',
            alt: 'Social Gathering'
        }
    }
]

const validationMessage = {
    'empty': 'This field is required',
    'incomplete': 'This field is incomplete',
    'email': 'Please enter a valid email',
    'invalid': 'Please enter a valid date',
    'past': 'Please enter a date in the future',
}

const updateOccasionDiv = (index) => { // index will be used to access the dets of eventsData
    const cardImg = document.createElement('img');
    const header6 = document.createElement('h6');
    const eventP = document.createElement('p');

    const screenWidth = window.innerWidth;
    switch (screenWidth) {
        case (1440):
            cardImg.src = eventsData[index].desktop.src;
            cardImg.className = eventsData[index].desktop.class;
            cardImg.alt = eventsData[index].desktop.alt;
            break;
        
        case (768):
            cardImg.src = eventsData[index].tablet.src;
            cardImg.className = eventsData[index].tablet.class;
            cardImg.alt = eventsData[index].tablet.alt;
            break;
        
        default: 
            cardImg.src = eventsData[index].mobile.src;
            cardImg.className = eventsData[index].mobile.class;
            cardImg.alt = eventsData[index].mobile.alt;

    }


    eventsImgDiv.append(cardImg);
    header6.innerText = eventsData[index].title;
    eventP.innerText = eventsData[index].text;
    occasionDiv.append(header6, eventP);
}

const updateReserveNumber = (btnId) => {
    const reserveNumber = document.getElementById('number');

    if (btnId === 'plus-btn') {
       numberOfPeople ++;
    } else {
        numberOfPeople --;
    }
    reserveNumber.innerText = limitNumber(numberOfPeople);
}

plusMinusBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        updateReserveNumber(btn.id)
    })
})

eventsNav.forEach(nav => {
    nav.addEventListener('click', () => {
        for (const nav of eventsNav) {
            nav.classList.remove('active')
        }
        nav.classList.add('active')
        occasionDiv.innerText = '';
        eventsImgDiv.innerHTML = ''
        const occasionIndex = eventsNav.indexOf(nav);
        updateOccasionDiv(occasionIndex) //index will be used to access the eventsdata
    })

})

const limitNumber = (num, min, max) => {
    const MIN = min ?? 2;
    const MAX = max ?? 20;
    const number = num;

    return Math.min(Math.max(number, MIN), MAX);
}

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

const hasError = (element, message) => {
    const errorDiv = element.querySelector('.error-div');
    element.classList.add('has-error');
    errorDiv.innerText = message;

    // console.log(errorDiv);
    /* because for the time and date elemnt they are in smaller divs to achive the desired look
    so I am first checking the ids if they are email or name as they are contained in one div to
    add the has-error styling
    */
    // if (element.id === 'email' || element.id === 'name' ) {
    //     element.parentElement.classList.add('has-error');
    //     element.parentElement.appendChild(errorDiv);
    // } else if (element.id !== 'name' || element.id !== 'email') {
    //     element.parentElement.parentElement.classList.add('has-error');
    //     element.parentElement.parentElement.appendChild(errorDiv);
    // }

}

const hasNoError = (element) => {
    const errorDiv =  element.querySelector('.error-div')
    errorDiv.innerText = ''

    element.classList.remove('has-error');

}

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
    const dateData = {}

    for (const field of dateInputs) {
        dateData[field.name] = field.value;
    }

    const dateDiv = document.getElementById('date');
    const reservationDate = Date.parse(`${dateData.year}-${dateData.month}-${dateData.day}`)
    const reservationDateValid = new Date(reservationDate);
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
        hasNoError(dateDiv, '');
    }
}

const validTime = () => {
    const timeDiv = document.getElementById('time');

    let timeData = []
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

form.addEventListener('submit', (e) => {
    e.preventDefault()

    validateInputs();
})
