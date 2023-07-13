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
function winOrLose(winner, userSelection, computerSelection) {
    if (winner === 'player') {
        return {
            result: 'win',
            message: `You win! ${titleCase(userSelection)} beats ${titleCase(computerSelection)}`,
        }

    } else if (winner === 'computer') {
        return {
            result: 'loss',
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
    let existingDiv = document.getElementById('results-bar')

    let result = playRound(userChoice)
    existingDiv.textContent = result.message;

    // if (!existingDiv) {
    //     // 1. Use createElement to create a new div
    //     const resultsDiv = document.createElement('div');
    //     // 2. Determine the target for your new element
    //     const body = document.body;
    //     // 3. Optionally customize the created new div before adding it to target
    //     resultsDiv.id = 'resultsDiv';
    //     resultsDiv.style.background = 'lightgrey'
    //     resultsDiv.style.border = '2px solid black'
    //     resultsDiv.style.marginTop = '20px'
    //     resultsDiv.style.padding = '15px'
    //     resultsDiv.textContent = playRound(userChoice)

    // // 4. Add element to target
    //     body.appendChild(resultsDiv);
    // } else {
    //     existingDiv.textContent = playRound(userChoice);
    // };
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


// Left off -- Display the running score, and announce a winner of the game once one player reaches 5 points.
// I need a counter for each player
// I need to identify if one of the players has reached 5
// I need a way to display the count
// I need a way to display the winner