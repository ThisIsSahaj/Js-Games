const words = 'This Java Tutorial is designed for beginners as well as experienced professionals Whether you’re looking to learn the basics of Java or its advanced concepts this free Java tutorial is the perfect resource for you'

const wordsDiv = document.querySelector('.words');

const gameDiv = document.querySelector('.game');




// to split all the words whenever space comes and return an array
const newWords = words.split(" ");
console.log(newWords);




const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * newWords.length);

    return newWords[randomIndex];
}
console.log(randomWord());


const formatWord = (word) => {
  return `
  <div class="singleWord"
  <span class="letter">
    ${word.split('').join('</span><span class="letter">')} 
  </span>
  </div>
  `
}


const newGame = () => {
    wordsDiv.innerHTML = " ";

    for(let i=0; i<200; i++)
    {
        wordsDiv.innerHTML += formatWord(randomWord());
    }
}

newGame();