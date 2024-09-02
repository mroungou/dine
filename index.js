const occasionDiv = document.getElementById('occasion-div');
const eventsImgDiv = document.getElementById('events-img-div');
const eventsNav = [...document.getElementsByClassName('event')]; //spread operator to change to array
const plusMinusBtn = [...document.getElementsByClassName('plus-minus-btn')]
let numberOfPeople = 2;
const inputElements = document.querySelectorAll('input');
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

