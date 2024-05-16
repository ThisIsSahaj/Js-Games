data =[
    {
      image : 'images/jack_club.png',
      name : 'jack_club'
    },
    {
      image : 'images/jack_diamond.png',
      name : 'jack_club'
    },
    {
      image : 'images/queen_club.png',
      name : 'jack_club'
    },
    {
      image : 'images/queen_diamond.png',
      name : 'jack_club'
    },
    {
      image : 'images/king_club.png',
      name : 'jack_club'
    },
    {
      image : 'images/king_diamond.png',
      name : 'jack_club'
    },
];



container = document.querySelector('.container');

const generateCards = () =>
{
  const card = document.createElement('div')
  card.classList.add('card');

  cardHtml = `
  <img src="images/jack_club.png" alt="">
  `

  container.insertAdjacentHTML('beforeend', cardHtml);


}

data.forEach(element => {
  generateCards();
});