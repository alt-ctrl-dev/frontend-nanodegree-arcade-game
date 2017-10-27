/**
 * @description Represents an enemy
 * @constructor
 * @param {number} x - The x position of the enemy
 * @param {number} y - The y position of the enemy
 */
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    //Sets a random value
    this.rand = Math.floor((Math.random() * 6) + 4);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @description Update the enemy's position. Required method for game
 * @method
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let base = 0.016;

    if (this.x > ctx.canvas.width + 50) {
        //If the enemy reaches the end of the canvas, remove it from the allEnemies array
        removeEnemy(this);
        //then spawn a new enemy
        spawnEnemy();
    } else {
        this.x = Math.floor(this.x + dt / base * this.rand);
    }
};


/**
 * @description Draw the enemy on the screen. Required method for game
 * @method
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Represents a player
 * @constructor
 * @param {number} x - The x position of the player
 * @param {number} y - The y position of the player
 */
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    //Stroes the start x,y location of the player
    this.startxloc = x;
    this.startyloc = y;
};

/**
 * @description Draw the player on the screen. Required method for game
 * @method
 */
Player.prototype.render = function () {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
    //if player has reached the top, then reset position
    if (this.y == 0) {
        this.reset();
    }
};

/**
 * @description Reset the player's position on the screen.
 * @method
 */
Player.prototype.reset = function () {
    this.y = this.startyloc;
    this.x = this.startxloc;
};

/**
 * @description Moves player based on keyboard input
 * @method
 * @param {string} key - the direction to be moved in (up,down,left,right)
 */
Player.prototype.handleInput = function (key) {
    // Game Over: will not response the keyup event
    // Win the Game: still can use direction keys to controll the player
    switch (key) {
        case "left":
            this.x = (this.x == 0) ? this.x : this.x - rowUnit;
            break;
        case "up":
            this.y = (this.y == 0) ? this.y : this.y - colUnit;
            break;
        case "right":
            this.x = (this.x / rowUnit == 4) ? this.x : this.x + rowUnit;
            break;
        case "down":
            this.y = (this.y / colUnit == 5) ? this.y : this.y + colUnit;
            break;
    }
};

// mapping default row and column size
const rowUnit = 101,
    colUnit = 75;

// Place the player object in a variable called player
var player = new Player(2 * rowUnit, 5 * colUnit);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * @description Removes the enemy from the allEnemies array
 * @function
 * @param {Enemy} enemy - the enemy object to be removed
 */
function removeEnemy(enemy) {
    allEnemies = allEnemies.filter(e => e !== enemy);
}

/**
 * @description Spawns an enemy at a random position
 * @function
 */
function spawnEnemy() {
    let randRow = Math.floor((Math.random() * 3) + 1);
    allEnemies.push(new Enemy(0, randRow * colUnit))
}