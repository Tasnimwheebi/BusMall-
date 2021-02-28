'use strict';
let busArry = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

const imgSection = document.getElementById( 'imgSection' );
const leftImg = document.getElementById( 'leftImg' );
const middleImg = document.getElementById( 'middleImg' );
const rightImg = document.getElementById( 'rightImg' );

let leftImgIndex = 0;
let middleImgIndex = 0;
let rightImgIndex = 0;
const clickCounter = 25;


function bus( name ) {
  this.name = name;
  this.img = `./img/${name}.jpg`;
  this.clicks = 0;
  this.shown = 0;
  bus.all.push( this );
}
bus.all = [];
bus.counter = 0;

for ( let i = 0; i < busArry.length; i++ ) {
  new bus( busArry[i] );
}

function renderNewProducts() {
  let leftIndex = randomNumber( 0, bus.all.length - 1 );
  leftImg.src = bus.all[leftIndex].img;
  leftImg.alt = bus.all[leftIndex].name;
  leftImgIndex = leftIndex;
  let middleIndex;
  let rightIndex;
  do {
    middleIndex = randomNumber( 0, bus.all.length - 1 );
    rightIndex = randomNumber( 0, bus.all.length - 1 );
  } while ( ( leftIndex === middleIndex ) || ( leftIndex === rightIndex ) || ( middleIndex === rightIndex ) );

  middleImg.src = bus.all[middleIndex].img;
  middleImg.alt = bus.all[middleIndex].name;
  middleImgIndex = middleIndex;

  rightImg.src = bus.all[rightIndex].img;
  rightImg.alt = bus.all[rightIndex].name;
  rightImgIndex = rightIndex;


  bus.all[leftIndex].shown++;
  bus.all[middleIndex].shown++;
  bus.all[rightIndex].shown++;
}

function handelClick( event ) {
  if ( bus.counter < clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImg' || clickedElement.id === 'middleImg' || clickedElement.id === 'rightImg' ) {
      if ( clickedElement.id === 'leftImg' ) {
        bus.all[leftImgIndex].clicks++;
      }
      if ( clickedElement.id === 'middleImg' ) {
        bus.all[middleImgIndex].clicks++;
      }
      if ( clickedElement.id === 'rightImg' ) {
        bus.all[rightImgIndex].clicks++;
      }
      bus.counter++;
      renderNewProducts();
      console.log( bus.all );
    }
  }
}
imgSection.addEventListener( 'click', handelClick );
console.log( bus.all );


function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
renderNewProducts();


