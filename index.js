const occasionDiv = document.getElementById('occasion-div');
const eventsImgDiv = document.getElementById('events-img-div');
const eventsNav = [...document.getElementsByClassName('event')]; //spread operator to change to array
const plusMinusBtn = [...document.getElementsByClassName('plus-minus-btn')]
let numberOfPeople = 2;
const inputElements = document.querySelectorAll('input');
const email = document.getElementById('email');
const form = document.getElementById('form');
const eventsData = [ // array containg data for the occasion div
    {
        title: 'Family Gathering',
        text: `We love catering for entire families. So please bring everyone along for a special meal with your
                loved ones. We’ll provide a memorable experience for all.`,
        imgDetails: {
            scr: './images/homepage/family-gathering-mobile.jpg',
            id: 'family-gathering-mobile',
            class: 'mobile',
            alt: 'Family Gathering'
        }
    },

    {
        title: 'Special Events',
        text: `Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you.
                We’ll be sure to mark your special date with an unforgettable meal.`,
        imgDetails: {
            scr: './images/homepage/special-events-mobile.jpg',
            id: 'special-event-mobile',
            class: 'mobile',
            alt: 'Special Events'
        }
    },

    {
        title: 'Social Events',
        text: `Are you looking to have a larger social event? No problem! We’re more than happy to cater for big
                parties. We’ll work with you to make your event a hit with everyone.`,
        imgDetails: {
            scr: './images/homepage/social-events-mobile.jpg',
            id: 'social-event-mobile',
            class: 'mobile',
            alt: 'Social Gathering'
        }
    }
]

const reservationInfo = [];



const updateOccasionDiv = (index) => { // index will be used to access the dets of eventsData
    const cardImg = document.createElement('img');
    const header6 = document.createElement('h6');
    const eventP = document.createElement('p');

    cardImg.src = eventsData[index].imgDetails.scr;
    cardImg.alt = eventsData[index].imgDetails.alt;
    cardImg.className = eventsData[index].imgDetails.class;


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
    const MIN = min ?? 1;
    const MAX = max ?? 20;
    const number = num;

    return Math.min(Math.max(number, MIN), MAX);
}

const validateInputs = () => {

    isEmailValid(email.value);


    for (const input of inputElements) {
        if (input.value === '') {
            // cals hasError function and adds the styling and text
            hasError(input);
        } else {
            hasNoError(input);
        }
    }
    // console.log(inputElements);
}

const hasError = (element) => {

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-div';
    errorDiv.innerText = 'This field is required'
    /* because for the time and date elemnt they are in smaller divs to achive the desired look
    so I am first checking the ids if they are email or name as they are contained in one div to
    add the has-error styling
    */
    if (element.id === 'email' || element.id === 'name' ) {
        element.parentElement.classList.add('has-error');
        element.parentElement.appendChild(errorDiv);
    } else if (element.id !== 'name' || element.id !== 'email') {
        element.parentElement.parentElement.parentElement.classList.add('has-error');
        element.parentElement.parentElement.parentElement.appendChild(errorDiv);
    }

}

const hasNoError = (element) => {
    element.parentElement.classList.remove('has-error')
}

const isEmailValid = (emailValue) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // will return true if the email entered is valid
    return regex.test(emailValue);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    validateInputs();
})
