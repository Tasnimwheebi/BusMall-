'use strict';
let busArry = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

const imgSection = document.getElementById( 'imgSection' );
const leftImg = document.getElementById( 'leftImg' );
const middleImg = document.getElementById( 'middleImg' );
const rightImg = document.getElementById( 'rightImg' );
const button = document.getElementById( 'view-results' );

let leftImgIndex = 0;
let middleImgIndex = 0;
let rightImgIndex = 0;
const clickCounter = 25;


function Bus( name , img ) {
  this.name = name;
  this.img = `./img/${img}`;
  this.clicks = 0;
  this.shown = 0;
  Bus.all.push( this );
}
Bus.all = [];
Bus.counter = 0;

for ( let i = 0 ; i < busArry.length ;i++ ){
  new Bus ( getName( busArry[i] ) ,busArry[i] );
}

function getName( fileName ) {
  return fileName.split( '.' ).slice( 0, -1 ).join( '.' );
}

function renderNewProducts() {
  let leftIndex = randomNumber( 0, Bus.all.length - 1 );
  leftImg.src = Bus.all[leftIndex].img;
  leftImg.alt = Bus.all[leftIndex].name;
  leftImgIndex = leftIndex;
  let middleIndex;
  let rightIndex;

  do {
    middleIndex = randomNumber( 0, Bus.all.length - 1 );
    rightIndex = randomNumber( 0, Bus.all.length - 1 );
  } while ( ( leftIndex === middleIndex ) || ( leftIndex === rightIndex ) || ( rightIndex === middleIndex ) );

  middleImg.src = Bus.all[middleIndex].img;
  middleImg.alt = Bus.all[middleIndex].name;
  middleImgIndex = middleIndex;

  rightImg.src = Bus.all[rightIndex].img;
  rightImg.alt = Bus.all[rightIndex].name;
  rightImgIndex = rightIndex;


  Bus.all[leftIndex].shown++;
  Bus.all[middleIndex].shown++;
  Bus.all[rightIndex].shown++;
}

function handelClick( event ) {
  if ( Bus.counter < clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImg' || clickedElement.id === 'middleImg' || clickedElement.id === 'rightImg' ) {
      if ( clickedElement.id === 'leftImg' ) {
        Bus.all[leftImgIndex].clicks++;
      }
      if ( clickedElement.id === 'middleImg' ) {
        Bus.all[middleImgIndex].clicks++;
      }
      if ( clickedElement.id === 'rightImg' ) {
        Bus.all[rightImgIndex].clicks++;
      }
      Bus.counter++;
      renderNewProducts();
      console.log( Bus.all );

    }
  }
}
imgSection.addEventListener( 'click', handelClick );
// console.log( Bus.all );

renderNewProducts();
button.addEventListener( 'click', getResult );

function getResult() {
  const parentElement = document.getElementById( 'results' );
  const articleElement = document.createElement( 'article' );
  parentElement.appendChild( articleElement );

  for ( let i = 0 ; i < Bus.all.length ; i++ ) {
    const ulElement = document.createElement( 'ul' );
    articleElement.appendChild( ulElement );
    ulElement.textContent = `${Bus.all[i].name} had ${Bus.all[i].clicks} votes , and was seen ${Bus.all[i].shown}times.`;
  }
  button.removeEventListener( 'click', getResult );
  button.textContent = 'Reset';
  button.onclick = function handelClick ( event ) {
    location.reload();
  };

} console.log( button );

renderNewProducts();

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
