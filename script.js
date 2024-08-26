const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;
const DINO_WIDTH = 50;
const DINO_HEIGHT = 50;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_SPEED = 5;

let dinoImage = new Image();
let obstacleImage = new Image();
dinoImage.src = './assets/pngtree-dinosaur-tyrannosaurus-illustration-png-image_6659086.png';
obstacleImage.src = './assets/caxtus.png';

let dino = {
    x: 50,
    y: canvas.height - DINO_HEIGHT,
    width: DINO_WIDTH,
    height: DINO_HEIGHT,
    velocityY: 0,
    jumping: false,
};

let obstacles = [];
let frame = 0;
let score = 0;

function drawDino() {
    ctx.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
    }
}

function createObstacle() {
    const y = canvas.height - OBSTACLE_HEIGHT;
    const x = canvas.width;
    obstacles.push({ x, y });
}

function updateObstacles() {
    for (let obstacle of obstacles) {
        obstacle.x -= OBSTACLE_SPEED;
    }
    obstacles = obstacles.filter(obstacle => obstacle.x + OBSTACLE_WIDTH > 0);
}

function detectCollision() {
    for (let obstacle of obstacles) {
        if (
            dino.x < obstacle.x + OBSTACLE_WIDTH &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + OBSTACLE_HEIGHT &&
            dino.y + dino.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function updateDino() {
    dino.y += dino.velocityY;
    dino.velocityY += GRAVITY;
    if (dino.y > canvas.height - DINO_HEIGHT) {
        dino.y = canvas.height - DINO_HEIGHT;
        dino.velocityY = 0;
        dino.jumping = false;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let sco = document.getElementById('sco')



    if (frame % 60 === 0) {
        createObstacle();
    }

    updateObstacles();
    updateDino();

    drawDino();
    drawObstacles();

    if (detectCollision()) {
        // alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }


    score++;
    frame++;
    sco.innerText = score


    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !dino.jumping) {
        dino.velocityY = JUMP_STRENGTH;
        dino.jumping = true;
    }
});

dinoImage.onload = function () {
    obstacleImage.onload = function () {
        gameLoop();
    }
}
