const data = [
  "JavaScript is a versatile programming language used for both client-side and server-side development.",
  "HTML and CSS are often used alongside JavaScript to create and style web pages.",
  "React is a popular JavaScript library for building user interfaces, particularly single-page applications.",
  "Node.js allows developers to use JavaScript for server-side scripting, enabling backend functionality.",
  "ES6 introduced many new features to JavaScript, including arrow functions, classes, and template literals.",
  "Async/await syntax in JavaScript helps to write cleaner and more readable asynchronous code.",
  "The Document Object Model (DOM) is a programming interface for web documents, which JavaScript can manipulate.",
  "APIs (Application Programming Interfaces) enable different software systems to communicate with each other.",
  "JavaScript frameworks like Angular and Vue.js provide powerful tools for building complex web applications.",
  "Debugging in JavaScript can be done using various tools like Chrome DevTools and Visual Studio Code."
];





const wordsDiv = document.querySelector('.words');

const body = document.querySelector('body');
const cursor = document.querySelector('.cursor');

const button = document.querySelector('button');

const timer = document.querySelector('.timer');
const result = document.querySelector('.result');
const gameTime = 30 * 1000;


// get a paragraph from the data
const words = `${data[Math.floor(Math.random() * data.length)]}`
// console.log(words);

// to split all the words whenever space comes and return an array
const newWords = words.split(" ");
// console.log('new words', newWords);



// format each letter of a word
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
    let counter = 30;
    result.innerHTML = '';


    
    newWords.forEach(element => {
      wordsDiv.innerHTML += formatWord(element);
    });


    const singleWord = document.querySelector('.singleWord');
    console.log('singleWord', singleWord);
    const letter = document.querySelector('.letter');
    console.log('letter',letter)

    addClass(singleWord, 'current');
    addClass(letter, 'current');

    const firstLetter = document.querySelector('.letter.current');
    cursor.style.top = firstLetter.getBoundingClientRect().top + 'px';
    cursor.style.left = firstLetter.getBoundingClientRect().left + 'px';

    let countdownTimer = setInterval(() => {
      counter--;
      timer.textContent = counter;

      if (counter < 0) {
          clearInterval(countdownTimer);
          timer.textContent = "Time's up!";
      }
  }, 1000);
  
    setTimeout(() => {
      gameOver();
    }, gameTime);


    // to focus on body, because it is focusing on the button
    body.focus();

}

const gameOver = () => {
  alert("Time's Up!");
  timer.innerHTML = `GAME OVER!`
  result.innerHTML = `WPM: ${getWpm()}`;
}

const getWpm = () =>{

  const words = [...document.querySelectorAll('.singleWord')];
  // console.log(words);

  const lastTypedWord = document.querySelector('.singleWord.current'); // the current element where game stopped
  const lastTypedWordIndex = words.indexOf(lastTypedWord);
 
  // getting all the words typed
  const typedWords = words.slice(0, lastTypedWordIndex);
  // console.log('typedWords',typedWords);


  // to get all the words inside the typedWords array
  const correctWords = typedWords.filter(word =>{      //passing each typed word one by one

    //get all letters in each word and make an array
    const letters = [...word.children];
    console.log('letters',letters);

    const incorrectLetters = letters.filter(curletter => curletter.className.includes('incorrect'));
    const correctLetters = letters.filter(curletter => curletter.className.includes('correct'));


    return incorrectLetters.length === 0 && correctLetters.length === letters.length;
  });


  return correctWords.length / gameTime * 60000;
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
  //if next is space
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

button.addEventListener('click', newGame);


