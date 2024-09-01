const colors = ["red", "blue", "yellow", "green"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

const gridItems = document.querySelectorAll('.grid div');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.getElementById('highScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const startButton = document.createElement('button');

// Create the start button
startButton.textContent = 'Start Game';
startButton.className = 'start-button';
startButton.addEventListener('click', startGame);

// Append the start button to the game over screen
gameOverScreen.appendChild(startButton);

function startGame() {
    gameOverScreen.style.display = 'none';  // Hide the game over screen
    resetGame();
    nextSequence();
}

function flashColor(color) {
    const element = document.querySelector(`.${color}`);
    element.style.opacity = '0.6';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 300);
}

function updateScore() {
    scoreElement.textContent = level - 1;
    scoreElement.classList.add('glow');

    setTimeout(() => {
        scoreElement.classList.remove('glow');
    }, 500);
}

function nextSequence() {
    acceptingInput = false; // Prevent input while showing sequence
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    level++;

    updateScore();

    // Flash only the newest color in the sequence
    setTimeout(() => {
        flashColor(randomColor);
        acceptingInput = true; // Allow input after the new color is shown
    }, 600);
}

function gameOver() {
    acceptingInput = false;
    finalScore.textContent = `Score: ${level - 1}`;

    const highScore = parseInt(highScoreElement.textContent, 10);
    if (level - 1 > highScore) {
        highScoreElement.textContent = level - 1;
        window.location.href = `/update_highscore/${level - 1}`;
    }

    gameOverScreen.style.display = 'flex';  // Show the game over screen with the start button
}

function resetGame() {
    gameSequence = [];
    level = 0;
    updateScore();
}

function checkSequence() {
    if (!acceptingInput) return;

    const currentLevel = playerSequence.length - 1;
    if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
        // Check if the player has completed the current sequence
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000); // Proceed to the next sequence
        }
    } else {
        gameOver(); // Incorrect sequence
    }
}

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        if (!acceptingInput) return;

        const clickedColor = item.classList[0];
        playerSequence.push(clickedColor);
        flashColor(clickedColor);
        checkSequence();
    });
});
nextSequence();