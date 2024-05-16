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



container = document.querySelector('.container');

const generateCards = (element) =>
{
  const card = document.createElement('div')
  card.classList.add('card');

  cardHtml = `
  <img src="${element.image}" alt="">
  <p>${element.name}</p>
  `

  container.insertAdjacentHTML('beforeend', cardHtml);

}



data.forEach(element => {
  generateCards(element);
});