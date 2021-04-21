//Convert Age to Days

const ageInDays = () => {
  var currentYear = new Date().getFullYear();
  var birthYear = prompt("What is the year you were born ?");
  var convertToDays = (currentYear - birthYear) * 365;

  document.getElementById("flex-box-result").innerHTML =
    "<h2>You are " + convertToDays + " day! </h2>";
};

const reset = () => {
  document.getElementById("flex-box-result").innerHTML = "";
};

//Cat Generator
const generateCat = () => {
  document.getElementById("flex-cat-gen").innerHTML +=
    '<img src="https://cdn2.thecatapi.com/images/1al.gif" />';
};

//Rock, Paper, Scissors
const rpsGame = (choice) => {
  //Verify if you have already click and reset if it is true
  if (
    document.getElementById("rock").style.display === "none" ||
    document.getElementById("paper").style.display === "none" ||
    document.getElementById("scissors").style.display === "none"
  ) {
    rpsReset();
    return false;
  }

  let humanChoice, botChoice;

  humanChoice = choice.id;
  botChoice = numToChoice(randNum());

  let result = decideWinner(humanChoice, botChoice);

  let message = finalMessage(result);

  fpsFrondEnd(humanChoice, botChoice, message);
};

const randNum = () => {
  return Math.floor(Math.random() * 3);
};

const numToChoice = (number) => {
  const arr = ["rock", "paper", "scissors"];
  return arr[number];
};

const decideWinner = (yourChoice, comChoice) => {
  let rpsAlgo = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsAlgo[yourChoice][comChoice];

  return yourScore;
};

const finalMessage = (yourScore) => {
  if (yourScore === 0) {
    return { message: "You lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied", color: "yellow" };
  } else {
    return { message: "You won!!", color: "green" };
  }
};

fpsFrondEnd = (hImageChoice, bImageChoise, finalMessage) => {
  //Hide all images
  document.getElementById("rock").style.display = "none";
  document.getElementById("paper").style.display = "none";
  document.getElementById("scissors").style.display = "none";

  //Display human choice and bot choice
  document.getElementById(hImageChoice).style.display = "block";
  document.getElementById(bImageChoise).style.display = "block";
  document.getElementById("final-result").innerHTML =
    "<h2 style='color:" +
    finalMessage["color"] +
    "'>" +
    finalMessage["message"] +
    " </h2> <button onclick='rpsReset()' class='btn btn-danger'>Reset</button>";
};

const rpsReset = () => {
  document.getElementById("rock").style.display = "block";
  document.getElementById("paper").style.display = "block";
  document.getElementById("scissors").style.display = "block";

  document.getElementById("final-result").innerHTML = "";
};

//Change the Color of All Buttons

var all_buttons = document.getElementsByTagName("button");

var originalButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
  originalButtons.push(all_buttons[i].classList[1]);
}

const buttonColorChange = (colorSelect) => {
  if (colorSelect.value === "blue") {
    buttonBlue();
  } else if (colorSelect.value === "red") {
    buttonRed();
  } else if (colorSelect.value === "yellow") {
    buttonYellow();
  } else if (colorSelect.value === "green") {
    buttonGreen();
  } else if (colorSelect.value === "random") {
    randomColors();
  } else if (colorSelect.value === "reset") {
    buttonColorReset();
  }
};

const buttonBlue = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-primary");
  }
};

const buttonRed = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
};

const buttonYellow = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-warning");
  }
};

const buttonGreen = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
};

const buttonColorReset = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(originalButtons[i]);
  }
};

const randomColors = () => {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let numRand = Math.floor(Math.random() * 4);
    let getRandomColor = choices[numRand];
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(getRandomColor);
  }
};

//Blackjack
let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  isStand: false,
  turnsOver: false,
  wins: 0,
  losses: 0,
  draws: 0,
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    //Remove all images
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    //Reset Score
    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";

    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    //Reset text to lets play
    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, activePlayer) {
  //Check for aces
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  showResult(computeWinner());
}

//Declare the winner + update wins, draws and losses
async function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You win";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
