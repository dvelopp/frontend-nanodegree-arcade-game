var ROW_HEIGHT = 80;
var SECOND_ROW_Y = 60;

var THIRD_ROW_Y = SECOND_ROW_Y + ROW_HEIGHT;
var FOURTH_ROW_Y = THIRD_ROW_Y + ROW_HEIGHT;
var ENEMY_ROWS_Y_VALUES = [SECOND_ROW_Y, THIRD_ROW_Y, FOURTH_ROW_Y];
var PLAYER_SKINS = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
];
var ENEMY_ATTACK_AREA = 50;

//ENEMY CLASS
var Enemy = function (speed) {
    this.x = 0;
    this.initRandomY();
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.initRandomY();
    }

    function checkLooseScenario() {
        if ((this.x - player.x <= ENEMY_ATTACK_AREA && this.x - player.x >= -ENEMY_ATTACK_AREA)
            && this.y === player.y) {
            startNewGame();
        }
    }

    checkLooseScenario.call(this);
};
Enemy.prototype.initRandomY = function () {
    this.y = ENEMY_ROWS_Y_VALUES[Math.floor(Math.random() * ENEMY_ROWS_Y_VALUES.length)];
};
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//PLAYER CLASS
var Player = function () {
    this.x = 200;
    this.y = 300;
};
Player.prototype.update = function () {
    if (this.currentMove === "left") {
        this.x -= 100;
    } else if (this.currentMove === "right") {
        this.x += 100;
    } else if (this.currentMove === "up") {
        this.y -= 80;
    } else if (this.currentMove === "down") {
        this.y += 80;
    }
    this.currentMove = "";

    function checkWinScenario() {
        if (this.y < 60) {
            startNewGame();
        }
    }

    checkWinScenario.call(this);
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
    this.currentMove = key;
};

//START A NEW GAME LOGIC
var allEnemies;
var player;
var startNewGame = function () {
    allEnemies = [];
    for (var i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
        allEnemies.push(new Enemy(Math.floor(Math.random() * 500) + 100))
    }
    player = new Player();
    player.currentMove = "";
    player.sprite = PLAYER_SKINS[Math.floor(Math.random() * PLAYER_SKINS.length)];
};
startNewGame();

//LISTENERS
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
