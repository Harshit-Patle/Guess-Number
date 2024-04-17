let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.gusses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const StartOver = document.querySelector('.resultParas');
const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess) || guess > 100 || guess < 1) {
        alert('Please enter valid Number 🚫');
    }
    else {
        prevGuess.push(guess);
        if (numGuess >= 10) {
            displayGuess(guess)
            displayMessage(`Game Over 💀.Random number was ${randomNumber}.`)
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}
function checkGuess(guess) {
    if (randomNumber === guess) {
        displayMessage(`You Won the Game 🏆`)
        endGame();
    } else if (guess > randomNumber) {
        displayMessage(`Number is Too High 📈`)
    } else if (guess < randomNumber) {
        displayMessage(`Number is Too Low 📉`)
    }
}
function displayGuess(guess) {
    userInput.value = ''
    guessSlot.innerHTML += `${guess}|`
    numGuess++
    remaining.innerHTML = `${10 - numGuess + 1}`
}
function displayMessage(message) {
    lowOrHi.innerHTML = `<h3>${message}</h3>`
}
function endGame() {
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`
    StartOver.appendChild(p)
    playGame = false
    newGame();
}
function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        e.preventDefault();
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess} `;
        userInput.removeAttribute('disabled');
        StartOver.removeChild(p);
        playGame = true;
    });
}