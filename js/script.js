const usedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesLeft = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");

//Empty Paragraph where messages will appear when player guesses letters
const message = document.querySelector(".message");
//Play again button
const playAgainButton = document.querySelector(".play-again");
//Starting Word
let word = "Magnolia";
//Previously Guessed Letters
let guessedLetters = [];
//Number of Guesses
let remainingGuesses = 8;
//Async Function to fetch data from web address
const getWord = async function () {
  const words = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const textWords = await words.text();
  //console.log(textWords);
  const arrayOfWords = textWords.split("\n");
  //console.log(arrayOfWords);
  const randomWord = Math.floor(Math.random() * arrayOfWords.length);
  //console.log(randomWord);
  word = arrayOfWords[randomWord].trim();
  //console.log(result);

  guessInProgress(word);
};

//Get the game started
getWord();

//Create the placeholders
const guessInProgress = function (words) {
  const placeHolders = [];
  const newArray = words.split("");
  for (let letters of newArray) {
    placeHolders.push("●");
  }
  wordInProgress.innerText = placeHolders.join("");
};

//Add Eventhandler for Button
button.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const input = letterInput.value;
  const goodGuess = validateInput(input);

  if (goodGuess) {
    makeGuess(input);
  }
  letterInput.value = "";
});

//Function to validate user input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    //Is the input empty?
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    //Did the user type more than one letter?
    message.innerText = "Please enter only one letter at a time!";
  } else if (!input.match(acceptedLetter)) {
    //Did the user type something other than a single letter?
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
    guesses();
    guessesRemaining(letter);
    inProgress(guessedLetters);
  }
  //console.log(guessedLetters);
};

//Function to Show the Guessed Letters
const guesses = function () {
  usedLetters.innerHTML = "";
  for (let letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    usedLetters.append(li);
  }
};

//Function to Update the Word in Progress
const inProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const newLetters = [];
  for (const elem of wordArray) {
    if (guessedLetters.includes(elem)) {
      newLetters.push(elem.toUpperCase());
    } else {
      newLetters.push("●");
    }
  }
  //console.log(newLetters);
  wordInProgress.innerText = newLetters.join("");
  playerWon(wordInProgress);
};

//Function to Count Number of Guesses Remaining
const guessesRemaining = function (guess) {
  const wordUpper = word.toUpperCase();

  if (wordUpper.includes(guess)) {
    message.innerText = "Good Guess! That letter is in the word!";
  } else {
    message.innerText = "Good try but that letter is not in the word!";
    remainingGuesses -= 1;
    guessesLeft.innerText = `You have ${remainingGuesses} guesses left.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Sorry, game over! The correct word was <span class="highlight"> ${word}</span>!`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuesses.innerText = `Don't sweat it but you only have ${remainingGuesses} guess left!`;
  } else if (remainingGuesses > 1) {
    remainingGuesses.innerText = `You have ${remainingGuesses} left! Choose Wisely!`;
  }
};

// Function to Check If the Player Won
const playerWon = function (wordInProgress) {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    startOver();
    message.innerHTML =
      '<p class="highlight">You guessed the correct word! Congrats!</p>';
  }
};

const startOver = function () {
  button.classList.add("hide");
  guessesLeft.classList.add("hide");
  usedLetters.classList.add("hide");
  letterInput.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

//Play Again Button Event Listener
playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessedLetters = [];
  usedLetters.innerText = "";
  remainingGuesses = 8;
  guessesLeft.innerText = `You have ${remainingGuesses} guesses left!`;
  remainingSpan.innerText = `${remainingGuesses} guesses`;

  wordInProgress.innerText = "";

  guessInProgress(word);

  button.classList.remove("hide");
  guessesLeft.classList.remove("hide");
  usedLetters.classList.remove("hide");
  letterInput.classList.remove("hide");
  playAgainButton.classList.add("hide");

  getWord();
});
