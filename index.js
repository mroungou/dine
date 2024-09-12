const occasionDiv = document.getElementById('occasion-div');
const eventsImgDiv = document.getElementById('events-img-div');
const eventsNav = [...document.getElementsByClassName('event')]; //spread operator to change to array
const eventsData = [ // array containg data for the occasion div
    {
        title: 'Family Gathering',
        text: "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.",
        alt: 'Family Gathering',
        mobile: {
            src: './images/homepage/family-gathering-mobile.jpg',
            id: 'family-gathering-mobile',
        },

        tablet: {
            src: './images/homepage/family-gathering-tablet.jpg',
            id: 'family-gathering-tablet',
        },

        desktop: {
            src: './images/homepage/family-gathering-desktop.jpg',
            id: 'family-gathering-desktop',
        }
    },

    {
        title: 'Special Events',
        text: "Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.",
        alt: 'Special Events',
        mobile: {
            src: './images/homepage/special-events-mobile.jpg',
            id: 'special-event-mobile',
        },

        tablet: {
            src: './images/homepage/special-events-tablet.jpg',
            id: 'special-event-tablet',
        },

        desktop: {
            src: './images/homepage/special-events-desktop.jpg',
            id: 'special-event-desktop',
        }
    },

    {
        title: 'Social Events',
        text: "Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.",
        alt: 'Social Gathering',
        mobile: {
            src: './images/homepage/social-events-mobile.jpg',
            id: 'social-event-mobile',

        },

        tablet: {
            src: './images/homepage/social-events-tablet.jpg',
            id: 'social-event-tablet',

        },

        desktop: {
            src: './images/homepage/social-events-desktop.jpg',
            id: 'social-event-desktop',
        }
    }
]

const updateOccasionDiv = (index = 0) => { // index will be used to access the dets of eventsData
    // clearing the DOM each time the function is called 
   occasionDiv.innerText = '';
   eventsImgDiv.innerHTML = ''
//    creating img, h6 and p tags since we are clearing the DOM
    const cardImg = document.createElement('img');
    const header6 = document.createElement('h6');
    const eventP = document.createElement('p');

    // this checks the width of the screen - will display the appropriate img
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1440) { // For desktop screens
        cardImg.src = eventsData[index].desktop.src;
        cardImg.alt = eventsData[index].alt;
    } else if (screenWidth >= 768) { // For tablet screens
        cardImg.src = eventsData[index].tablet.src;
        cardImg.alt = eventsData[index].alt;
    } else { // For mobile screens
        cardImg.src = eventsData[index].mobile.src;
        cardImg.alt = eventsData[index].alt;
    }

    // adding the imgs and text to appropriate divs
    eventsImgDiv.append(cardImg);
    header6.innerText = eventsData[index].title;
    eventP.innerText = eventsData[index].text;
    occasionDiv.append(header6, eventP);
}

/* adds eventlisterns to the nav section
depending on the nav clicked and it's position in the eventsNav arr it will be used to determine
which data will be parsed from the eventsData by updateOccasion()
*/
eventsNav.forEach(nav => {
    nav.addEventListener('click', () => {
        for (const nav of eventsNav) {
            nav.classList.remove('active')
        }
        nav.classList.add('active')
        const occasionIndex = eventsNav.indexOf(nav);
        updateOccasionDiv(occasionIndex) //index will be used to access the eventsdata
    })

})

window.addEventListener('DOMContentLoaded', () => { 
    // when the page loads it will update the occasion div
    updateOccasionDiv();
})

window.addEventListener('resize', () => {
    // when the screen changes width it also updates the DOM
    updateOccasionDiv()
})

