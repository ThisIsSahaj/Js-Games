data =[
    {
      image : 'images/jack_club.png',
      name : 'jack_club'
    },
    {
      image : 'images/jack_diamond.png',
      name : 'jack_diamond'
    },
    {
      image : 'images/queen_club.png',
      name : 'queen_club'
    },
    {
      image : 'images/queen_diamond.png',
      name : 'queen_diamond'
    },
    {
      image : 'images/king_club.png',
      name : 'king_club'
    },
    {
      image : 'images/king_diamond.png',
      name : 'king_diamond'
    },
];



const container = document.querySelector('#container');



const generateCards = (element) =>
{
  const card = document.createElement('div')
  card.classList.add('card');
  card.dataset.name = element.name;

  // card.style.backgroundImage = `url(${element.image})`;

  // cardHtml = `
  // <img src="${element.image}" alt="">
  // `

  // card.insertAdjacentHTML('afterbegin', cardHtml);
  container.appendChild(card);
  
  const cardBack = document.createElement('div');
  cardBack.classList.add('cardBack');
  // cardBack.style.backgroundImage = url(images/back.png);
  
  
  const cardFront = document.createElement('div');
  cardFront.classList.add('cardFront');
  cardFront.style.backgroundImage = `url(${element.image})`;

  card.appendChild(cardFront)
  card.appendChild(cardBack)
}



const cardsMatched = () => {
  let cards = document.querySelectorAll('.cardSelected');
  
  cards.forEach(element => {
    element.classList.add('matchedCards')
    // element.classList.remove('cardBack');
  });
}




let counter = 0;
let firstCard = "";
let secondCard = "";


const resetGame = () => {
  counter = 0;
  firstCard = "";
  secondCard = "";
  let cards = document.querySelectorAll('.cardSelected');
  
  cards.forEach(element => {
    element.classList.remove('cardSelected');
  });
}


const cardSelected = (element) => {
   let curCard = element;

   
   if (curCard.id === 'container') {
     return false;
    }
    
    if (counter < 2) {
      if (counter === 0) {
        // firstCard = curCard.dataset.name;
        firstCard = curCard.parentNode.dataset.name;
        curCard.parentNode.classList.add('cardSelected');
        // console.log(firstCard);
      }
      else{
        // secondCard = curCard.dataset.name;
        secondCard = curCard.parentNode.dataset.name;
        curCard.parentNode.classList.add('cardSelected');
        // console.log(secondCard);
      }
      counter++;
    }

    if (firstCard !== "" && secondCard !== "") {
      if (firstCard === secondCard) {

        setTimeout(() => {
     
          cardsMatched();
          resetGame();
        }, 1000);
      }
      else{
        setTimeout(() => {
     
          resetGame();
        }, 1000);
      }
    }
    
  
}




// to double the array
const totalData = data.concat(data);

// to shuffle the array
const shuffledData = Array.from(totalData).sort( ()=> Math.random() - 0.5 ); // sorting is done alphabetically by default    // Math.random() returns random float no. btw 0 & 1





shuffledData.forEach(element => {
  generateCards(element);
  // generateCards(element);
});



container.addEventListener('click', (event)=> { 
    // console.log(event.target);
    cardSelected(event.target);
})
