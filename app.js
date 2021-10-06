
const startButton = document.querySelector('.btn__reset');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');


let missedGuesses = 0;

//  UNIVERSTIES 
const phrases = [
    'Auburn University',
    'University of Georgia',
    'University of Florida',
    'University of Alabama',
    'Mississippi State University'
];


// RETURN A RANDOM PHRASE FROM AN ARRAY
const getRandomPhraseArray = (arr) => {
    let randomPhrase = [];
    let randomNumber = Math.floor(Math.random() * arr.length);
    randomPhrase = phrases[randomNumber];
    randomPhrase = randomPhrase.split("");
    return randomPhrase; 

}

// ADDS THE LETTER OF A STRING TO THE DISPLAY
const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let ul = phrase.firstElementChild;
        let li = document.createElement("li");
        li.textContent =  arr[i];
        if (arr[i] !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        ul.appendChild(li);
    }

}

// CHECK IF A LETTER IS IN THE PHRASE 
const checkLetter = (button) => {
    let checkLetter = document.querySelectorAll('#phrase li');
    let match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if (button.textContent === checkLetter[i].textContent) {
            checkLetter[i].className += "show";
            match = checkLetter[i].textContent;
        }
    }
    return match;
}

//CHECK IF THE GAME HAS BEEN WON OR LOST
function checkWin() {

    let letters = document.getElementsByClassName('letter');
    let shownList = document.getElementsByClassName('show');
    if (letters.length === shownList.length) {
        overlay.className = 'win';
        overlay.firstElementChild.textContent = "Congrats, you WIN!"
        overlay.style.display = 'flex';
    } else if (missedGuesses >= 5) {
        overlay.className = 'lose';
        overlay.firstElementChild.textContent = "Sorry...Better luck next time."
        overlay.style.display = 'flex';
    }
}

//LISTEN FOR THE START GAME BUTTON TO BE PRESED
startButton.addEventListener("click", () => {
    if (startButton.className === 'btn__reset reset') {
        window.location.reload();
    }
    startButton.parentElement.style.display = 'none';
    resetGame();

})

//LISTEN FOR THE ONSCREEN KEYBOARD TO BE CLICKED
qwerty.addEventListener('click', (event) => {

    let buttonClicked = event.target;
    if (buttonClicked.tagName === "BUTTON") {
        buttonClicked.className += "chosen";
        let match = checkLetter(buttonClicked);
        buttonClicked.disabled = true;
        if (match === null) {
            missedGuesses++;
            let heart = document.querySelector('#scoreboard ol').firstElementChild;
            heart.remove();
        }
    }
    checkWin();
});

//RESET GAME

function resetGame() {
    startButton.textContent = "Try Again!";
    startButton.className += "Reset";
}


const pickedPhrase = getRandomPhraseArray(phrases);
addPhraseToDisplay(pickedPhrase);





