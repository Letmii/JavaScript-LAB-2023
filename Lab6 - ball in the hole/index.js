const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let howMany = 0;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 9,
    color: 'green',
    speed: 3
};

let hole = {
    x: canvas.width - 30,
    y: canvas.height - 30,
    radius: 20,
    color: 'black'
};

let startTime, endTime, elapsedTime;
let records = [];

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = hole.color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawHole();
}

function update() {
    if (startTime === undefined) startTime = Date.now();

    if (Math.abs(ball.x - hole.x) < hole.radius && Math.abs(ball.y - hole.y) < hole.radius) {
        endTime = Date.now();
        elapsedTime = (endTime - startTime) / 1000;
        let min = elapsedTime / 60;
        let howManyMin = howMany / min;
        records.push(elapsedTime);
        startTime = undefined;
        howMany++;
        alert("Congratulations! You completed the level in " + elapsedTime + " seconds in minute " + howManyMin);
    }

    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

function handleOrientation(event) {
    let x = event.gamma / 30;
    let y = event.beta / 30;

    x = -x;
    y = -y;

    ball.x += x;
    ball.y += y;

    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

window.addEventListener('deviceorientation', handleOrientation);

gameLoop();