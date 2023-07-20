// game();
// Randomly returns rock,paper,scissors
addEventListeners();

function addEventListeners() {
    let rpsButtons = document.querySelectorAll(".rps-selection");

    rpsButtons.forEach(button => button.addEventListener("click", function () {
        playRound(button.id, getComputerChoice());
    }))
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

function playRound(playerSelection = "", computerSelection) {
    // Double check to make sure inputs are all lowercase
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

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
    
    function displayResult(textToDisplay){
        let resultDiv = document.getElementById("round-results");
        resultDiv.textContent = textToDisplay;
    }
}
    function capitalize(input) {
        // debugger;
        return input.replace(input, input.toLowerCase()).replace(input.charAt(0), input.charAt(0).toUpperCase());
    }

function game() {
    let playerScore = 0;
    let cpuScore = 0;
    let roundNum = 1;

    alert("We're going to play rock paper scissors. First one to 3 wins.\n\nGood luck!")

    while (playerScore < 3 && cpuScore < 3) {
        let playerSelection;
        playerSelection = prompt("Round: " + roundNum + "\n\nRock, Paper or Scissors?");

        playerSelection = playerSelection.toLowerCase().trim();
        let cpuSelection = getComputerChoice();

        while (playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors") {
            playerSelection = prompt(playerSelection + " is not a valid option in Rock Paper Scissors, please try again.");
            playerSelection = playerSelection.toLowerCase().trim();
        }
        let result = playRound(playerSelection, cpuSelection);

        if (result === "win") playerScore++;
        else if (result === "lose") cpuScore++;
        roundNum++;
    }

    let result = (playerScore > cpuScore) ? "You Win!" : (cpuScore > playerScore) ? "You Lose :(" : "Meh. It's a tie. Better play again.";

    let gameOverMsg = "Final Results\nNumber of rounds played: " + roundNum + "\nPlayer Score: " + playerScore + "\nCPU Score: " + cpuScore + "\n\n" + result;

    alert(gameOverMsg);
}