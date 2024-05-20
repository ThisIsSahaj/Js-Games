const words = 'This Java Tutorial is designed for beginners as well as experienced professionals Whether you’re looking to learn the basics of Java or its advanced concepts this free Java tutorial is the perfect resource for you'

const wordsDiv = document.querySelector('.words');

const body = document.querySelector('body');





// to split all the words whenever space comes and return an array
const newWords = words.split(" ");
// console.log(newWords);




const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * newWords.length);
    return newWords[randomIndex];
}
// console.log(randomWord());


const formatWord = (word) => {
  return `
  <div class="singleWord"
  <span class="letter">
    ${word.split('').join('</span><span class="letter">')}</span>
  </div>
  `
}

const addClass = (element, className) => {
//   element.classlist.add(className);
     element.className += ' ' + className;
}

const removeClass = (element, className) => {
//   element.classlist.remove(className);
     element.className = element.className.replace(className, '');
}


const newGame = () => {
    wordsDiv.innerHTML = " ";

    for(let i=0; i<200; i++)
    {
        wordsDiv.innerHTML += formatWord(randomWord());
    }

    const singleWord = document.querySelector('.singleWord');
    console.log(singleWord);
    const letter = document.querySelector('.letter');
    console.log(letter)

    addClass(singleWord, 'current');
    addClass(letter, 'current');
}


body.addEventListener('keyup', ev => {
    // console.log(ev);

    const key = ev.key;


    const currentWord = document.querySelector('.singleWord.current');
    const currentLetter = document.querySelector('.letter.current');
    console.log(currentLetter);
    const expected = currentLetter.innerHTML;
    

    //check whether the input is a letter or not
    //if it's length is not equal to 1, it means it is 'Backspace'
    //if key is empty ' ' it means  it is the space key
    const isLetter = key.length === 1 && key !== ' ';


    console.log({key, expected});

    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? 'correct' : 'incorrect');   //if key = expected key, then add class correct, if not then add class incorrect
        removeClass(currentLetter, 'current'); 
        addClass(currentLetter.nextSibling, 'current')
      }
    }

    // if key is SPACE
    if(key === ' ')
    {
      if (expected !== ' ') {
        const letterToInvalidate = [...document.querySelectorAll('.singleWord.current.letter:not(.correct)')]
        letterToInvalidate.forEach(letter => {
          addClass(letter, 'incorrect');
        });
      }
      removeClass(currentWord, 'current');
      addClass(currentWord.nextSibling, 'current')

      if (currentLetter) {
        removeClass(currentLetter, 'current');
      }
      addClass(currentWord.nextSibling.firstChild, 'currents')
    }
})  


newGame();

