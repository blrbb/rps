"use strict";
let playerScore = 0;
let cpuScore = 0;
let roundNum = 1;

document.querySelector("#new-game-button").addEventListener("click", newGame);

newGame();

function newGame() {
    playerScore = 0;
    cpuScore = 0;
    roundNum = 1;
    addEventListeners();
    updateScoreboard();
    displayResult(`Let's play some Rock Paper Scissors. First one to 3 wins.\r\n Good Luck!`)
}


function playRound(e) {
    // Double check to make sure inputs are all lowercase
    let playerSelection = e.target.id;
    playerSelection = playerSelection.toLowerCase();
    let computerSelection = getComputerChoice();

    let result = getRoundResults();
    if (result === "win") playerScore++;
    else if (result === "lose") cpuScore++;
    roundNum++;
    updateScoreboard();
    checkGameOver();

    function getRoundResults() {

        if (playerSelection === computerSelection) {
            displayResult("Oh dang, it's a tie! you both played " + playerSelection) + ". Gotta go again.";
            return "tie";
        }
        switch (playerSelection + " " + computerSelection) {
            case "rock scissors":
            case "scissors paper":
            case "paper rock":
                displayResult("Congratulatations! You win!!!! " + capitalize(playerSelection) + " beats " + capitalize(computerSelection));
                return "win";

            default:
                displayResult("You lose :( " + capitalize(computerSelection) + " beats " + capitalize(playerSelection));
                return "lose";

        }
    }
}

function displayResult(textToDisplay) {
    let resultDiv = document.getElementById("round-results");
    resultDiv.textContent = textToDisplay;
}

function displayFinalResults(textToDisplay){
    displayResult(textToDisplay);
    let resultDiv = document.getElementById("round-results");
    
    resultDiv.classList.add("game-over-result");
    
    let rpsButtons = document.querySelectorAll(".rps-selection");
    rpsButtons.forEach(button => button.removeEventListener("click", playRound));
}

function addEventListeners() {
    let rpsButtons = document.querySelectorAll(".rps-selection");

    rpsButtons.forEach(button => button.addEventListener("click", playRound));
}

function getComputerChoice() {
    let randomSelection = Math.ceil(Math.random() * 3);

    switch (randomSelection) {
        case 1:
            return "rock"

        case 2:
            return "paper";

        case 3:
            return "scissors";
    }
}

function updateScoreboard() {
    let playerScoreDiv = document.getElementById("player-score");
    let cpuScoreDiv = document.getElementById("cpu-score");
    let roundCountDiv = document.getElementById("round-count");
    roundCountDiv.textContent = roundNum;
    playerScoreDiv.textContent = playerScore;
    cpuScoreDiv.textContent = cpuScore;
}

function capitalize(input) {
    // debugger;
    return input.replace(input, input.toLowerCase()).replace(input.charAt(0), input.charAt(0).toUpperCase());
}

function checkGameOver(winCount = 5) {
    if (playerScore < winCount && cpuScore < winCount) return;
    
    let result = (playerScore > cpuScore) ? "You Win!" : (cpuScore > playerScore) ? "You Lose :(" : "Meh. It's a tie. Better play again.";

    let gameOverMsg = "Final Results\nNumber of rounds played: " + roundNum + "\nPlayer Score: " + playerScore + "\nCPU Score: " + cpuScore + "\n\n" + result;

    displayFinalResults(result);
}