const guessedLetters = document.querySelector(".guessed-letters");
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

//Add Eventlistener for Button
button.addEventListener("click", function (e) {
  e.preventDefault();
  const input = letterInput.value;
  console.log(input);
  letterInput.value = "";
});
