const buttons = document.querySelectorAll('.button');
const humanCounter = document.querySelector('.human');
const computerCounter = document.querySelector('.computer');
const messageDiv = document.querySelector('.message'); 

const resetCounters = () => {
  humanCounter.textContent = 0;
  computerCounter.textContent = 0;
};

const checkIfGameFinished = () => {
  const numberInHumanCounter = parseInt(humanCounter.textContent);
  const numberInComputerCounter = parseInt(computerCounter.textContent);
  if (numberInComputerCounter == 5) {
    typeWriter("The computer won!");
    resetCounters();
  }
  if (numberInHumanCounter == 5) {
    typeWriter("You won!");
    resetCounters();
  }
}
const updateGame = (button) => {
  const choice = button.classList[1];
  const result = playGame(choice, computerPlay());
  let numberInHumanCounter = parseInt(humanCounter.textContent);
  let numberInComputerCounter = parseInt(computerCounter.textContent);
  if(result.win === true) {
    numberInHumanCounter = numberInHumanCounter + 1;
    humanCounter.textContent = numberInHumanCounter;
  }
  else if (result.win === false) {
    numberInComputerCounter = numberInComputerCounter + 1;
    computerCounter.textContent = numberInComputerCounter;
  }
  if(numberInComputerCounter == 5 || numberInHumanCounter == 5) {
    typeWriter("Do you want to play a game?");
  }
  else {
    typeWriter(result.message);
  }
  checkIfGameFinished();
};

buttons.forEach(button => {
  button.addEventListener('click',() => updateGame(button));
});



const typeWriter = (txt, speed = 50, i = 0) => {
  if (i===0) {
    messageDiv.textContent = "";
  }
  if (i < txt.length) {
    messageDiv.innerHTML += txt.charAt(i);
    i++;
    setTimeout(() => typeWriter(txt, speed, i), speed);
  }
}

typeWriter("Do you want to play a game?");

const computerPlay = () => {
  const randomNumber = Math.floor(Math.random()*3) + 1;
  switch(randomNumber) {
    case 1:
      return 'rock';
    case 2:
      return 'paper';
    case 3: 
      return 'scissors';
  }
};

const playGame = (playerSelection, computerSelection) => {
  let outcome;
  // console.group("Game")
  // console.log("Player:" + playerSelection);
  // console.log("Computer:" + computerSelection);
  // console.groupEnd()
  if(playerSelection === computerSelection) {
    return { win: null, message: `You both got ${playerSelection}. It's a tie.`};
  }
  else if(playerSelection === "rock") {
    if(computerSelection === "scissors") { outcome = { win: true }; }
    if(computerSelection === "paper"){ outcome = { win: false }; }
  } 
  else if(playerSelection === "paper") {
    if(computerSelection === "scissors") { outcome = { win: false }; }
    if(computerSelection === "rock") { outcome = { win: true }; }
  }
  else if(playerSelection === "scissors") {
    if(computerSelection === "paper") { outcome = { win: true }; }
    if(computerSelection === "rock") { outcome = { win: false }; }
  }
  if(outcome.win===true) {
    return {...outcome, message: `You won! ${playerSelection} beats ${computerSelection}.`};
  }
  else if(outcome.win===false) {
    return {...outcome, message: `You lost! ${computerSelection} beats ${playerSelection}.`};
  }
};


