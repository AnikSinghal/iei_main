const colors = ["red", "blue", "yellow", "green"];
let gameSequence = [];
let playerSequence = [];
let level = 0;

const gridItems = document.querySelectorAll('.grid div');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.getElementById('highScore');

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
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    level++;
    
    updateScore();
    
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, (index + 1) * 600);
    });
}

function gameOver() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScore = document.getElementById('finalScore');

    // Display the final score
    finalScore.textContent = `Score: ${level - 1}`;

    // Update high score if necessary
    const highScore = parseInt(highScoreElement.textContent, 10);
    if (level - 1 > highScore) {
        highScoreElement.textContent = level - 1;
        window.location.href = `/update_highscore/${level - 1}`;
    }

    // Show the game over screen
    gameOverScreen.style.display = 'flex';
    
    // Reset the game after 3 seconds
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
        gameSequence = [];
        level = 0;
        updateScore();
        nextSequence(); // Restart the game
    }, 3000);
}

function checkSequence() {
    const currentLevel = playerSequence.length - 1;
    if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        const clickedColor = item.classList[0];
        playerSequence.push(clickedColor);
        flashColor(clickedColor);
        checkSequence();
    });
});

nextSequence();
