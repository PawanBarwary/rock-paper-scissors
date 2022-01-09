const buttons = document.querySelectorAll('.button');
const humanCounter = document.querySelector('.human');
const computerCounter = document.querySelector('.computer');
const messageDiv = document.querySelector('.message'); 

const updateGame = (button) => {
  const choice = button.textContent;
  const result = playGame(choice, computerPlay());
  let numberInHumanCounter = parseInt(humanCounter.textContent);
  let numberInComputerCounter = parseInt(computerCounter.textContent);
  if(result.win === true) {
    numberInHumanCounter = numberInHumanCounter + 1;
    humanCounter.textContent = numberInHumanCounter;
  }
  else if (result.win === false) {
    numberInComputerCounter = numberInComputerCounter + 1;
    humanCounter.textContent = numberInHumanCounter;
  }
  messageDiv.textContent = result.message;
};

buttons.forEach(button => {
  button.addEventListener('click',() => updateGame(button));
});

const computerPlay = () => {
  let randomNumber = Math.floor(Math.random()*3) + 1;
  switch(randomNumber) {
    case 1:
      return 'Rock';
    case 2:
      return 'Paper';
    case 3: 
      return 'Scissors';
  }
};

const playGame = (playerSelection, computerSelection) => {
  let outcome;
  console.group("Game")
  console.log("Player:" + playerSelection);
  console.log("Computer:" + computerSelection);
  console.groupEnd()
  playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1);
  if(playerSelection === computerSelection) {
    return { win: null, message: `You both got ${playerSelection}. It's a tie.`};
  }
  else if(playerSelection === "Rock") {
    if(computerSelection === "Scissors") { outcome = { win: true }; }
    if(computerSelection === "Paper"){ outcome = { win: false }; }
  } 
  else if(playerSelection === "Paper") {
    if(computerSelection === "Scissors") { outcome = { win: false }; }
    if(computerSelection === "Rock") { outcome = { win: true }; }
  }
  else if(playerSelection === "Scissors") {
    if(computerSelection === "Paper") { outcome = { win: true }; }
    if(computerSelection === "Rock") { outcome = { win: false }; }
  }
  if(outcome.win===true) {
    return {...outcome, message: `You won! ${playerSelection} beats ${computerSelection}.`};
  }
  else if(outcome.win===false) {
    return {...outcome, message: `You lost! ${computerSelection} beats ${playerSelection}.`};
  }
};

const game = (numGames) => {
  const allResults = [];
  for(let i = 1; i<=numGames; i++) {
    const playerSelection = prompt("What do you choose?");
    const computerSelection = computerPlay();
    const result = playGame(playerSelection, computerSelection);
    allResults.push(result.message);
  }
  return allResults;
};

const playerSelection = "rock";
const computerSelection = computerPlay();

