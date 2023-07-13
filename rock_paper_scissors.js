const options = ["rock", "paper", "scissors"]
let gameIsActive = false
let playerWinTotal = 0
let computerWinTotal = 0
let gameCounter = 0

function titleCase(string) {
    let sentence = string.toLowerCase().split(" ")
    for(let i = 0; i< sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
    return sentence.join(" ")
}

// Picks a play for the AI
function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * options.length)
    let computerChoice = options[randomIndex]
    
    return computerChoice
}

// Declares a winner
function winOrLose(winner, userSelection, computerSelection) {
    gameCounter += 1;
    if (winner === 'player') {
        playerWinTotal += 1;
        return {
            result: 'win',
            message: `You win! ${titleCase(userSelection)} beats ${titleCase(computerSelection)}`,
        }

    } else if (winner === 'computer') {
        computerWinTotal += 1;
        return {
            result: 'lose',
            message: `You lose! ${titleCase(computerSelection)} beats ${titleCase(userSelection)}`,
        }
    } else {
        return {
            result: 'tie',
            message: `It was a Tie! ${titleCase(userSelection)} ties ${titleCase(computerSelection)}`,
        }
    }
}

// Determines a winner
function playRound(userSelection) {
    // let userSelection = prompt("Choose Rock, Paper, or Scissors: ").toLowerCase()
    let computerSelection = getComputerChoice()

    // Check if userSelection is valid
    if (userSelection === 'rock' || userSelection === 'paper' || userSelection === 'scissors') {
        switch (userSelection) {
            // Tie Case
            case computerSelection:
                return winOrLose('tie',userSelection, computerSelection)
            // Win or Loss Cases
            case 'rock':
                if (computerSelection === 'scissors') {
                    return winOrLose('player', userSelection,computerSelection)
                } else {
                    return winOrLose('computer',userSelection, computerSelection)
                }

            case 'scissors':
                if (computerSelection === 'paper') {
                    return winOrLose('player', userSelection,computerSelection)
                } else {
                    return winOrLose('computer',userSelection, computerSelection)
                }

            case 'paper':
                if (computerSelection === 'rock') {
                    return winOrLose('player', userSelection,computerSelection)
                } else {
                    return winOrLose('computer',userSelection, computerSelection)
                }
        }
    } else {
        // If userSelection not valid, return error
        return alert('Error: Only enter Rock, Paper, or Scissors!')
    }
}

function displayResults(userChoice) {
    // Add a div to the page to display the log messages to track what is happening
    let existingResultsDiv = document.getElementById('results-bar')

    let result = playRound(userChoice)
    if (result.result === 'win') {
        existingResultsDiv.style.backgroundColor = 'lightgreen'
    } else if (result.result === 'lose') {
        existingResultsDiv.style.backgroundColor = '#cc7b7b'
    } else {
        existingResultsDiv.style.backgroundColor = 'lightgrey'
    };
    existingResultsDiv.textContent = result.message;
}


function activeGameSession() {
    while (playerWinTotal < 5 && computerWinTotal < 5) {
        gameIsActive = true
    }
}

// Add an event listener for the buttons that call the playRound function
// 1. Create a constant
const playerSelectionButtons = document.querySelectorAll('.playerSelection')

// 2. Do a for each to apply to each mention of button
playerSelectionButtons.forEach(function(button) {
    // 3. Add an event listener for click
    button.addEventListener('click', function(e) {
        console.log(e.target.id);
        // activeGameSession()
        displayResults(e.target.id)
    });
});



