const words = "This Java Tutorial is designed for beginners as well as experienced professionals Whether you're looking to learn the basics of Java or its advanced concepts this free Java tutorial is the perfect resource for you"

const wordsDiv = document.querySelector('.words');

const body = document.querySelector('body');
const cursor = document.querySelector('.cursor');

const timer = document.querySelector('.timer');






// to split all the words whenever space comes and return an array
const newWords = words.split(" ");
// console.log(newWords);

const counter = 10;


const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * newWords.length);
    return newWords[randomIndex];
}
// console.log(randomWord());


const formatWord = (word) => {
  return `
  <div class="singleWord"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>
  `
}

let addClass = (element, className) => {
//   element.classlist.add(className);
     element.className += ' ' + className;
}

let removeClass = (element, className) => {
  // element.classlist.remove(className);
     element.className = element.className.replace(className, '');
}


const newGame = () => {
    wordsDiv.innerHTML = " ";

    for(let i=0; i<200; i++)
    {
        wordsDiv.innerHTML += formatWord(randomWord());
    }

    const singleWord = document.querySelector('.singleWord');
    console.log('singleWord', singleWord);
    const letter = document.querySelector('.letter');
    console.log('letter',letter)

    addClass(singleWord, 'current');
    addClass(letter, 'current');

  
    setTimeout(() => {
      gameOver();
    }, 10000);


}

const gameOver = () => {
  alert('gameover');
}



const handleSpace = (expected, currentWord, currentLetter) => {
  if (expected !== ' ') {
    const lettersToInvalidate = [...document.querySelectorAll('.singleWord.current .letter:not(.correct)')];
    lettersToInvalidate.forEach(letter => {
      addClass(letter, 'incorrect');
    });
  }
  removeClass(currentWord, 'current');
  console.log('current word', currentWord );
  addClass(currentWord.nextElementSibling, 'current');
  console.log('new current word', currentWord.nextElementSibling );



  if (currentLetter) {
    removeClass(currentLetter, 'current');
    console.log('currentLetter', currentLetter);
  }
  console.log('currentWord firstChild', currentWord.nextElementSibling.firstChild);
  addClass(currentWord.nextElementSibling.firstChild, 'current')
}

const handleBackspace = (currentLetter, isFirstLetter, currentWord ) => {
  // if backspace at start of next word
  if (currentLetter && isFirstLetter) {
    // make previous word current
    removeClass(currentWord, 'current');
    addClass(currentWord.previousElementSibling, 'current');

    // make last letter current
    removeClass(currentLetter, 'current');
    addClass(currentWord.previousElementSibling.lastChild, 'current');

    removeClass(currentWord.previousElementSibling.lastChild, 'incorrect');
    removeClass(currentWord.previousElementSibling.lastChild, 'correct');
  }

  // if backspace in middle of a word
  if (currentLetter && !isFirstLetter) {
    removeClass(currentLetter, 'current');
    addClass(currentLetter.previousElementSibling, 'current');

    removeClass(currentLetter.previousElementSibling, 'incorrect');
    removeClass(currentLetter.previousElementSibling, 'correct');
    
  }

  // if backspace at the end of a word
  if(!currentLetter) //therefore expected = space
  {
    addClass(currentWord.lastChild, 'current');
    removeClass(currentWord.lastChild, 'incorrect');
    removeClass(currentWord.lastChild, 'correct');
  }
}


const moveCursor = () => {
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.singleWord.current');

  console.log('nextLetter',nextLetter);
  console.log('nextWord',nextWord);

  if (nextLetter) {
    cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
    cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
  }
  else{
    cursor.style.top = nextWord.getBoundingClientRect().top + 7  + 'px';
    cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
  }
}






body.addEventListener('keyup', ev => {
    // console.log(ev);

    const key = ev.key;


    const currentWord = document.querySelector('.singleWord.current');
    const currentLetter = document.querySelector('.letter.current');
    console.log('currentLetter',currentLetter);

    //if no currentLetter, then expected key will be space
    const expected = currentLetter?.innerHTML || ' ';
    

    //check whether the input is a letter or not
    //if it's length is not equal to 1, it means it is 'Backspace'
    //if key is empty ' ' it means  it is the space key
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackSpace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;



    console.log({key, expected});

    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? 'correct' : 'incorrect');   //if key = expected key, then add class correct, if not then add class incorrect
        removeClass(currentLetter, 'current'); 
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, 'current');
          console.log('new currentLetter',currentLetter.nextSibling);
        }
      }
    }

    // if key is SPACE
    if(isSpace)
    {
     handleSpace(expected, currentWord, currentLetter);
    }

    // if key is BACKSPACE
    if (isBackSpace) {
    handleBackspace(currentLetter, isFirstLetter, currentWord);
    }

    
    // move cursor
    moveCursor();

    
})  


newGame();

