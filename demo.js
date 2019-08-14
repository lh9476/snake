var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var speed = 200;
var scoreBox = document.getElementById('score');
var loser = document.getElementById('loser');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startP = document.getElementById('startP');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var startPauseBool = true;
var startGameBool = true;



init();

function init() {
    this.mapW = parseInt(window.getComputedStyle(content).width);
    this.mapH = parseInt(window.getComputedStyle(content).height);
    this.mapDiv = content;

    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];

    this.dir = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;

    this.score = 0;
    scoreBox.innerHTML = this.score;

    bindEvent();
}

function startGame() {
    startPage.style.display = 'none';
    startP.style.display = 'block';
    food();
    snake();

}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW));
    this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH));
    food.style.position = 'absolute';
    food.style.left = this.foodX * this.foodW + 'px';
    food.style.top = this.foodY * this.foodH + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for (i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.dir) {
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            case 'right':
                break;
            default:
                break;
        }
    }
}

function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.dir) {
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.dir) {
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.snakeW) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.snakeH) {
        relodGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
            relodGame();
        }
    }
}

function setDir(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.dir = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 39:
            if (this.right) {
                this.dir = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.dir = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 40:
            if (this.down) {
                this.dir = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }

}

function relodGame() {
    removeClass('food');
    removeClass('snake');
    clearInterval(snakeMove);
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    this.dir = 'right';
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startPauseBool = true;
    startGameBool = true;
    startP.setAttribute('src','img/start.png');
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}


function bindEvent() {
    close.onclick = function () {
        loser.style.display = 'none';
    }
    startBtn.onclick = function () {
        startAndPause();
    }
    startP.onclick = function () {
        startAndPause();
    }
}

function startAndPause() {
    if (startPauseBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', 'img/pause.png');
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDir(code);
        }
        snakeMove = setInterval(function () {
            move();
        }, speed);
        startPauseBool = false;
    } else {
        startP.setAttribute('src', 'img/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        };
        startPauseBool = true;
    }
}