const options = ["rock", "paper", "scissors"]

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
function winOrLose(win, userSelection, computerSelection) {
    if (win === true) {
        return `You win! ${titleCase(userSelection)} beats ${titleCase(computerSelection)}`
    } else if (win === false) {
        return `You lose! ${titleCase(computerSelection)} beats ${titleCase(userSelection)}`
    }
}

// Determines a winner
function playRound(userSelection) {
    // let userSelection = prompt("Choose Rock, Paper, or Scissors: ").toLowerCase()
    let computerSelection = getComputerChoice()

    if (userSelection === 'rock' || userSelection === 'paper' || userSelection === 'scissors') {
        switch (userSelection) {
            case computerSelection:
                return `It was a Tie! ${titleCase(userSelection)} ties ${titleCase(computerSelection)}`

            case 'rock':
                if (computerSelection === 'scissors') {
                    return winOrLose(true, userSelection,computerSelection)
                } else {
                    return winOrLose(false,userSelection, computerSelection)
                }

            case 'scissors':
                if (computerSelection === 'paper') {
                    return winOrLose(true, userSelection,computerSelection)
                } else {
                    return winOrLose(false,userSelection, computerSelection)
                }

            case 'paper':
                if (computerSelection === 'rock') {
                    return winOrLose(true, userSelection,computerSelection)
                } else {
                    return winOrLose(false,userSelection, computerSelection)
                }
        }
    } else {
        return 'Error: Only enter Rock, Paper, or Scissors!'
    }
}

// Allow for multiple iterations of games
function game(numberOfGames) {
    let i = 0
    while (i < numberOfGames) {
        i++
        console.log(playRound())
    }
}

function displayResults(userChoice) {
    // Add a div to the page to display the log messages to track what is happening
    // 1. Use createElement to create a new div
    const resultsDiv = document.createElement('div');
    // 2. Determine the target for your new element
    const body = document.body;
    // 3. Optionally customize the created new div before adding it to target
    resultsDiv.style.background = 'lightgrey'
    resultsDiv.style.border = '2px solid black'
    resultsDiv.style.marginTop = '20px'
    resultsDiv.style.padding = '15px'
    resultsDiv.textContent = playRound(userChoice)

    // 4. Add element to target
    body.appendChild(resultsDiv);
}


// Add an event listener for the buttons that call the playRound function
// 1. Create a constant
const playerSelectionButtons = document.querySelectorAll('.playerSelection')
// 2. Do a for each to apply to each mention of button
playerSelectionButtons.forEach(function(button) {
    // 3. Add an event listener for click
    button.addEventListener('click', function(e) {
        console.log(e.target.id);
        displayResults(e.target.id)
    });
});

