const usedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");

//Empty Paragraph where messages will appear when player guesses letters
const message = document.querySelector(".message");
//Play again button
const playAgainButton = document.querySelector(".play-again");
//Starting Word
const word = "Magnolia";
//Previously Guessed Letters
const guessedLetters = [];

//Create the placeholders
const guessInProgress = function (words) {
  const placeHolders = [];
  const newArray = words.split("");
  for (let letters of newArray) {
    placeHolders.push("●");
  }
  wordInProgress.innerText = placeHolders.join("");
};

guessInProgress(word);

//Add Eventhandler for Button
button.addEventListener("click", function (e) {
  e.preventDefault();
  const input = letterInput.value;
  console.log(input);
  letterInput.value = "";
  message.innerText = "";
  validateInput(input);
  makeGuess(input);
});

//Function to validate user input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.innerText = "Please enter only one letter at a time!";
  } else if (input.match(/[a-zA-Z]/) === null) {
    message.innerText = "Please enter a letter between A and Z!";
  } else {
    return input;
  }
};

//Function to capture input
const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You've already guessed that letter.  Try again!";
  } else {
    guessedLetters.push(letter);
  }
  console.log(guessedLetters);
};
