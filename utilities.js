'use strict'; 

let images = [
    {
        src: 'img/slides/1.jpg',
        caption: 'Freedom'
    },
    {
        src: 'img/slides/2.jpg',
        caption: 'Une ruelle colorée'
    },
    {
        src: 'img/slides/3.jpg',
        caption: 'Un vélo orange'
    },
    {
        src: 'img/slides/4.jpg',
        caption: 'Des escaliers peints'
    },
    {
        src: 'img/slides/5.jpg',
        caption: 'Des enfants sur un vélo'
    },
    {
        src: 'img/slides/6.jpg',
        caption: 'Un grapheur'
    },
];

let buttonNext = document.querySelector('#button-next');
let buttonPrev = document.querySelector('#button-prev');
let figure = document.querySelector('figure');
let index = 0;

let img = figure.querySelector('img');
let caption = figure.querySelector('figcaption');

const span = document.getElementById('compteur');

function dipslay () {
    span.innerText= (`Photo ${parseFloat(index) + 1}/${images.length}`);
    img.setAttribute('src', images[index].src);
    caption.innerText = images[index].caption;
    console.log(`index n°${index}; image n°${parseFloat(index) + 1}`);
}

function changeOpacity() {
    let dots = Array.from(document.querySelectorAll('#dots img'));
    for (let i = 0; i <= dots.length - 1; i++) {
        if (dots[i].getAttribute('data-index') == index) {
             dots[i].classList.remove('opacity');
        } else {
            dots[i].classList.add('opacity');
        }
    }
}

function getRandomInteger(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*********** AFFICHAGE AU DEMARRAGE DE LA PAGE *******************/

document.addEventListener('DOMContentLoaded', () => {
    span.innerText= (`Utilisez les flèches pour changer d'image`);
    img.setAttribute('src', images[0].src);
    caption.innerText = images[0].caption;
});

/********************** PHOTO SUIVANTE ***************************/
buttonNext.addEventListener('click', function() {
    nextPhoto();
});

function nextPhoto() {
    index++;
    if(index > images.length - 1) {
        index = 0;
    }
    dipslay();
    changeOpacity();
}

/********************** PHOTO PRECEDENTE ************************/
buttonPrev.addEventListener('click', function() {
    previousPhoto();
});

function previousPhoto() {
    index--;
    if (index < 0) {
        index = images.length - 1;
    } 
    dipslay();
    changeOpacity();
}

/********************** BOUTON AUTOMATIQUE ************************/
let buttonAuto = document.querySelector('#button-auto');
let buttonStop = document.querySelector('#button-stop');

let interval;

buttonAuto.addEventListener('click', function() {
    interval = setInterval(function() {
        nextPhoto();
    }, 1000);
    this.classList.add("buttonHide");
    buttonStop.classList.remove("buttonHide");
    buttonStop.classList.add("buttonShow");
});
 
buttonStop.addEventListener('click', function() {
    clearTimeout(interval);
    this.classList.remove("buttonShow");
    this.classList.add("buttonHide");
    buttonAuto.classList.remove("buttonHide");
    buttonAuto.classList.add("buttonShow");
});
    
/********************** IMAGES ALEATOIRES ************************/
let buttonRandom = document.querySelector('#button-random');

buttonRandom.addEventListener('click', function() {
    random()});

function random () {
    let randomIndex = getRandomInteger(0, images.length - 1);
    console.log(`randomIndex = ${randomIndex}`);
    
    if (index == randomIndex) {
        randomIndex = getRandomInteger(0, images.length - 1);
        index = randomIndex;
    } else {
        index = randomIndex;
    }
    
    dipslay();
}

/************ GESTION DES FLECHES DROITE ET GAUCHE ****************/
window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
        previousPhoto();
    } else if (event.key == "ArrowRight") {
        nextPhoto();
    }
});

/******  AFFICHER UNE IMAGE QUAND ON CLIQUE SUR SA MINIATURE********/
function miniatures() {
    for (let i = 0; i <= images.length - 1; i++) {
        miniature(i);
    }
}

function miniature(index) {
    const min = document.createElement('img');
    min.classList.add('min');
    min.setAttribute('data-index', index);
    min.setAttribute('src', images[index].src);
    min.setAttribute('width', '200px');
    min.setAttribute('height', '200px');
    
    //rendre opaques les miniatures (sauf la 1ère) lorsqu'on charge la page
    if (index > 0) {    
        min.classList.add('opacity');
    }

    document.querySelector('#dots').appendChild(min);
}

document.addEventListener('DOMContentLoaded', () => {
    miniatures();
    let dots = Array.from(document.querySelectorAll('#dots img'));
    dots.forEach(min => {
        min.addEventListener('click', function() {
            // 1.Afficher l'image correspondante dans le slider
            index = this.dataset.index;
            dipslay();
            
            // 2.Rendre opaque les miniatures non affichées dans le slider
            for (let i = 0; i <= dots.length - 1; i++) {
                dots[i].classList.remove('opacity');

                if (dots[i].getAttribute('data-index') !== index) {
                     dots[i].classList.add('opacity');
                }
            }
        });
    });
});