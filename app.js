/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, activePlayer, roundScore, game;
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (game) {
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice > 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Button Hold
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (game) {
    // 1. Add roundScore to score to the active player
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.getElementById("score-" + activePlayer).innerText =
      scores[activePlayer];

    // 3. Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      game = false;
    } else {
      nextPlayer();
    }
  }
});

// Button New
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  game = true;

  // Hide The dice
  document.querySelector(".dice").style.display = "none";

  // Reset Values
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
}

function nextPlayer() {
  // Change the player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Reset the score
  roundScore = 0;

  document.querySelector("#current-0").innerText = "0";
  document.querySelector("#current-1").innerText = "0";

  // Remove The active class THEN add to the active element
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}
