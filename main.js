// 'use strict';

// const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
let marble = null;
let empty = null;

const selectMarble = (element) => {
  empty = element;
  marble = element.cloneNode();
  console.log(marble);
  document.addEventListener("mousemove", onMouseMove);
};

const dropMarble = (element) => {
  console.log('hello')
  console.log(marble.classList[0])
  element.classList.add(marble.classList[0], marble.classList[1])
  element.classList.remove('empty')
  
}

function onMouseMove(e) {
  empty.classList.add("empty");
  document.body.appendChild(marble);
  marble.classList.add("sticky");
  marble.style.left = e.pageX + "px";
  marble.style.top = e.pageY + "px";
  console.log(e.pageX);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseUp(e) {
  document.removeEventListener("mousemove", onMouseMove);
  document.body.removeChild(marble);
  empty.classList.remove('empty')
  marble = null;
}

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateHint = (guess) => {
  // your code here
  let hints = 0;
  let hints2 = 0;
  let guessArray = guess.split("");
  let solutionArray = solution.split("");

  guessArray.forEach(function (letter, index) {
    if (guessArray[index] == solutionArray[index]) {
      hints++;
      guessArray[index] = 0;
      solutionArray[index] = 1;
    }
  });

  guessArray.forEach(function (guessLetter, guessIndex) {
    solutionArray.forEach(function (solutionLetter, solutionIndex) {
      if (guessLetter == solutionLetter) {
        hints2++;
        guessArray[guessIndex] = 0;
        solutionArray[solutionIndex] = 1;
      }
    });
  });
  return hints + "-" + hints2;
};

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess == solution) {
    return console.log("You guessed it!");
  }
  if (solution != guess) {
    board.push(guess);
    console.log(generateHint(guess));
    console.log(solution);
  }
};

// const getPrompt = () =>  {
//   rl.question('guess: ', (guess) => {
//     mastermind(guess);
//     printBoard();
//     getPrompt();
//   });
// }

// Tests

// if (typeof describe === 'function') {
//   solution = 'abcd';
//   describe('#mastermind()', () => {
//     it('should register a guess and generate hints', () => {
//       mastermind('aabb');
//       assert.equal(board.length, 1);
//     });
//     it('should be able to detect a win', () => {
//       assert.equal(mastermind(solution), 'You guessed it!');
//     });
//   });

//   describe('#generateHint()', () => {
//     it('should generate hints', () => {
//       assert.equal(generateHint('abdc'), '2-2');
//     });
//     it('should generate hints if solution has duplicates', () => {
//       assert.equal(generateHint('aabb'), '1-1');
//     });

//   });

// } else {

//   generateSolution();
//   getPrompt();
// }
