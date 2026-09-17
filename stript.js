const dot = document.getElementById("dot");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const gameArea = document.getElementById("gameArea");

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveInterval;
let gameActive = false;

startBtn.addEventListener("click", startGame);
dot.addEventListener("click", catchDot);

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;

    scoreSpan.textContent = score;
    timeSpan.textContent = timeLeft;

    message.classList.add("hidden");
    startBtn.classList.add("hidden");

    dot.style.display = "block";

    moveDot();

    moveInterval = setInterval(moveDot, 800);

    gameInterval = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function catchDot() {
    if (!gameActive) return;

    score++;
    scoreSpan.textContent = score;

    moveDot();
}

function moveDot() {
    const maxX = gameArea.clientWidth - dot.clientWidth;
    const maxY = gameArea.clientHeight - dot.clientHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    dot.style.left = x + "px";
    dot.style.top = y + "px";
}

function endGame() {
    gameActive = false;

    clearInterval(gameInterval);
    clearInterval(moveInterval);

    dot.style.display = "none";

    startBtn.classList.remove("hidden");

    message.classList.remove("hidden");
    message.textContent = `Game Over! Final Score: ${score}`;
}