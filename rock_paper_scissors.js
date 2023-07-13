const options = ["rock", "paper", "scissors"]
let gameIsActive = false
let gameCounter = 0
let playerWinTotal = 0
let computerWinTotal = 0

// Utility for displaying anything in title case
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

function updateStatGroup(winner) {
    if (winner === 'player') {
        let target = document.getElementById('userWinCounter')

        target.textContent = `${playerWinTotal}/5`
    } else if(winner === 'computer') {
        let target = document.getElementById('computerWinCounter')

        target.textContent = `${computerWinTotal}/5`
    }

    let totalGamesTarget = document.getElementById('totalGamesCounter')

    totalGamesTarget.textContent = `${gameCounter}`
}

function resetStatGroup() {
    gameCounter = 0
    playerWinTotal = 0
    computerWinTotal = 0
    
    let userWinTarget = document.getElementById('userWinCounter')
    userWinTarget.textContent = `${playerWinTotal}/5`

    let totalGamesTarget = document.getElementById('totalGamesCounter')
    totalGamesTarget.textContent = `--`

    let computerWinTarget = document.getElementById('computerWinCounter')
    computerWinTarget.textContent = `${playerWinTotal}/5`

}

function resetResultsBar() {
    let existingResultsDiv = document.getElementById('results-bar')

    existingResultsDiv.textContent = '...'
    existingResultsDiv.style.backgroundColor = 'lightgrey'
}

// Declares a winner
function winOrLose(winner, userSelection, computerSelection) {
    
    if (winner === 'player') {
        playerWinTotal += 1;
        updateStatGroup(winner)
        return {
            result: 'win',
            message: `You win! ${titleCase(userSelection)} beats ${titleCase(computerSelection)}`,
        }

    } else if (winner === 'computer') {
        computerWinTotal += 1;
        updateStatGroup(winner)
        return {
            result: 'lose',
            message: `You lose! ${titleCase(computerSelection)} beats ${titleCase(userSelection)}`,
        }
    } else {
        updateStatGroup(winner)
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

const controlAreaDiv = document.getElementById('control-area')
// 1) First load of page
const playGameButton = document.createElement('button')

playGameButton.id = 'playGameButton'
playGameButton.textContent = 'Play a Game'

controlAreaDiv.appendChild(playGameButton)

playGameButton.classList.add('playerSelection')

playGameButton.addEventListener('click', function() {

    gameIsActive = true
    console.log('The game is active')
    
    // Swap to in-game state where controls are displayed
    while (controlAreaDiv.firstChild) {
        controlAreaDiv.removeChild(controlAreaDiv.firstChild);
    }
    controlAreaDiv.style.backgroundColor = '#dfd4c6'
    
    resetStatGroup()
    resetResultsBar()

    // Add the prompt next to the button group
    const selectionButtonPrompt = document.createElement('h3')
    selectionButtonPrompt.textContent = "Choose an option to play:"
    controlAreaDiv.appendChild(selectionButtonPrompt)
    
    // Add the button group
    const selectionButtons = document.createElement('div')
    selectionButtons.id = 'selectionButtons'
    controlAreaDiv.appendChild(selectionButtons)

    // Add buttons to button group
    const rockButton = document.createElement('button')
    rockButton.id = 'rock'
    rockButton.textContent = 'Rock'

    const paperButton = document.createElement('button')
    paperButton.id = 'paper'
    paperButton.textContent = 'Paper'

    const scissorsButton = document.createElement('button')
    scissorsButton.id = 'scissors'
    scissorsButton.textContent = 'Scissors'

    let buttonsInSelectionButtons = selectionButtons.getElementsByTagName('button')

    selectionButtons.appendChild(rockButton)
    selectionButtons.appendChild(paperButton)
    selectionButtons.appendChild(scissorsButton)

    // Add class to buttons. Must happen after elements appended.
    for (i=0; i < buttonsInSelectionButtons.length;i++) {
        buttonsInSelectionButtons[i].classList.add('playerSelection')
    }

    // Add a listener to the player selection buttons
    const playerSelectionButtons = document.querySelectorAll('.playerSelection')

    // 2. Do a for each to apply to each mention of button
    playerSelectionButtons.forEach(function(button) {
        // 3. Add an event listener for click
        button.addEventListener('click', function(e) {
            console.log(e.target.id);
            
            // activeGameSession()
            gameCounter += 1
            displayResults(e.target.id)
            if (playerWinTotal === 5 || computerWinTotal === 5) {
                let endGameMessage = document.createElement('h3')
                
                while (controlAreaDiv.firstChild) {
                    controlAreaDiv.removeChild(controlAreaDiv.firstChild);
                }

                if (playerWinTotal === 5) {
                    // Display congratulations
                    endGameMessage.textContent = 'You beat the computer!'
                    controlAreaDiv.style.backgroundColor = 'lightgreen'
                    controlAreaDiv.appendChild(endGameMessage)
                } else if (computerWinTotal === 5) {
                    endGameMessage.textContent = 'The computer beat you! Try Again!'
                    controlAreaDiv.style.backgroundColor = '#cc7b7b' //lightred
                    controlAreaDiv.appendChild(endGameMessage)
                }

                gameIsActive = false
                controlAreaDiv.appendChild(playGameButton)
            }
        });
    });

})


