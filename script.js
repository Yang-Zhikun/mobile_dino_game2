// 获取canvas元素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// 设置canvas尺寸适应屏幕
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 恐龙的初始位置和大小
let dinoX = canvas.width * 0.0625;
let dinoY = canvas.height * 0.733;
let dinoWidth = canvas.width * 0.05;
let dinoHeight = canvas.height * 0.133;
let dinoJumping = false;
let dinoJumpVelocity = canvas.height * 0.033;

// 障碍物列表
let obstacles = [];
let obstacleWidth = canvas.width * 0.025;
let obstacleHeight = canvas.height * 0.133;
let obstacleSpeed = canvas.width * 0.015;

function createObstacle() {
    let obstacleX = canvas.width;
    let obstacleY = canvas.height * 0.733;
    obstacles.push({ x: obstacleX, y: obstacleY });
}

function drawDino() {
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (dinoJumping) {
        dinoY -= dinoJumpVelocity;
        dinoJumpVelocity -= canvas.height * 0.00167;
        if (dinoY >= canvas.height * 0.733) {
            dinoY = canvas.height * 0.733;
            dinoJumping = false;
        }
    }

    if (Math.random() < 0.05 || obstacles.length === 0) {
        createObstacle();
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacleSpeed;
        if (obstacle.x + obstacleWidth < 0) {
            obstacles.splice(index, 1);
        }

        if (dinoX < obstacle.x + obstacleWidth &&
            dinoX + dinoWidth > obstacle.x &&
            dinoY < obstacle.y + obstacleHeight &&
            dinoY + dinoHeight > obstacle.y) {
            // 游戏结束逻辑，这里简单停止循环
            cancelAnimationFrame(requestId);
        }
    });

    drawDino();
    drawObstacles();
    requestId = requestAnimationFrame(update);
}

// 绑定触摸屏幕事件实现跳跃
canvas.addEventListener('touchstart', function () {
    if (!dinoJumping) {
        dinoJumping = true;
    }
});

// 绑定点击事件实现跳跃（兼容部分浏览器）
canvas.addEventListener('click', function () {
    if (!dinoJumping) {
        dinoJumping = true;
    }
});

let requestId;
update();
