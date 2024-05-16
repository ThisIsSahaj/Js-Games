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



const container = document.querySelector('.container');



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

const cardSelected = (element) => {
   let curCard = element;

   curCard.classList.add('cardSelected');
   setTimeout(() => {
     curCard.remove.add('cardSelected');    
   }, 1000);
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
