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

  cardHtml = `
  <img src="${element.image}" alt="">
  `

  card.insertAdjacentHTML('afterbegin', cardHtml);
  container.appendChild(card);

}



const cardsMatched = (firstCard) => {
 let cards = document.querySelectorAll(firstCard);

 cards.forEach(element => {
     element.classList.add('matchedCards');
 });
}

const checkMatch = (firstCard, secondCard) => {
  if (firstCard === secondCard) {
    cardsMatched(firstCard);
  }
}

let counter = 0;
let firstCard = "";
let secondCard = "";


const cardSelected = (element) => {
   let curCard = element;

   
   if (curCard.id === 'container') {
     return false;
    }
    
    if (counter < 2) {
      if (counter === 0) {
        firstCard = curCard.dataset.name;
        console.log(firstCard);
        curCard.classList.add('cardSelected');
      }
      else{
        secondCard = curCard.dataset.name;
        console.log(secondCard);
        curCard.classList.add('cardSelected');
      }
    }

    if (counter == 2) {
      checkMatch(firstCard, secondCard);
    }
    counter++;
    
  //  setTimeout(() => {
  //    curCard.classList.remove('cardSelected');    
  //  }, 2000);
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