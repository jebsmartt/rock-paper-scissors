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
    const computerChoice = options[randomIndex]
    
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
function playRound() {
    const userSelection = prompt("Choose Rock, Paper, or Scissors: ").toLowerCase()
    const computerSelection = getComputerChoice()

    if (userSelection === 'rock' || userSelection === 'paper' || userSelection === 'scissors') {
        switch (userSelection) {
            case computerSelection:
                return `It was a Tie! ${titleCase(userSelection)} ties ${titleCase(computerSelection)}`
                break

            case 'rock':
                if (computerSelection === 'scissors') {
                    winOrLose(true, userSelection,computerSelection)
                } else {
                    winOrLose(false,userSelection, computerSelection)
                }
                break

            case 'scissors':
                if (computerSelection === 'paper') {
                    winOrLose(true, userSelection,computerSelection)
                } else {
                    winOrLose(false,userSelection, computerSelection)
                }
                break

            case 'paper':
                if (computerSelection === 'rock') {
                    winOrLose(true, userSelection,computerSelection)
                } else {
                    winOrLose(false,userSelection, computerSelection)
                }
                break
        }
    } else {
        return 'Error: Only enter Rock, Paper, or Scissors!'
    }
}