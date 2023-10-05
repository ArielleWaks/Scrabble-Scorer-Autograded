// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let userWord = input.question("Enter a word to score: ");
   return userWord;
};




let simpleScorer = function (word) {
   word = word.toUpperCase();
   let score = word.length;
   return score;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[`${word[i]}`];
   }
   return score;
};

let simpleObject = {
   'name' : 'Simple Score',
   'description': 'Each letter is worth 1 point.',
   'scoringFunction' : simpleScorer
};

let vowelBonusObject = {
   'name' : 'Bonus Vowels',
   'description': 'Vowels are 3 pts, consonants are 1 pt.',
   'scoringFunction' : vowelBonusScorer
};

let scrableObject = {
   'name' : 'Scrabble',
   'description': 'The traditional scoring algorithm.',
   'scoringFunction' : scrabbleScorer
};

const scoringAlgorithms = [simpleObject, vowelBonusObject, scrableObject];

function scorerPrompt() {
   console.log(`\nWhich scoring algorithm would you like to use?\n`)
   for (i = 0; i < scoringAlgorithms.length; i++) {
      console.log(
         `${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}
         `);
   }
   let userAlgorithm = input.question("Enter 0, 1, or 2: ");
   while (!(Number(userAlgorithm) >= 0 || Number(userAlgorithm) <= 3)) {
      userAlgorithm = input.question("Invalid. Enter 0, 1, or 2: ");
   }
   return scoringAlgorithms[userAlgorithm];
};

function transform(oldObject) {
   let newObject = {};
   for (let key in oldObject) {
      for (let i = 0; i < oldObject[key].length; i++) {
         newObject[`${oldObject[key][i].toLowerCase()}`] = Number(key);
      }
   }
   return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let userWord = initialPrompt();
   let scoreType = scorerPrompt();
   console.log(
      `\nScore count for '${userWord}': ${scoreType.scoringFunction(userWord)}\n`
      );

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
