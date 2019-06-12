'use strict';

// base class for enemies and player
class BaseClass {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the player and enemy images on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends BaseClass {
    constructor(x, y, sprite, howFast) {
        super(x, y, sprite);
        this.howFast = howFast;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.howFast;

        // if the enemy is off the right side of the screen, return it to the left side
        if (this.x >= 505) {
            this.x = -125;
        }
        
        // collisions will only happen on three player position y values - 42, 125 and 208 
        // collisions will only happen on three enemy position y values - 62, 145 and 228 
        // subtract 20 from the enemy position to make the comparison easier
        // use the abs() function when determining the distance between player and enemy
        // this covers a collision of + or - 50

        let enemyYPos = this.y - 20;
        let enemyXPos = this.x;

        if ((Math.abs(enemyXPos - player.x) <= 50) && enemyYPos == player.y ){
            player.resetPosition();
        }
    }
}

// player class
class Player extends BaseClass {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    // Places the player at the starting position
    resetPosition() {
        this.x = 202;
        this.y = 374;
    }

    handleInput(e) {
        // This case statement increments the player position based on which key was pressed.
        // If icrementing the current value would result in the player moving off screen then the key press is ignored
        switch (e) {
            case 'left':
                if (this.x >= 101){
                    this.x -= 101;
                }
                break;
            case 'right':
                if (this.x <= 303) {
                    this.x += 101;
                }
                break;
            case 'up':
                if (this.y >= 42) {
                    this.y -= 83;
                }
                // if the current y position is less than or equal to zero then they made it to the river and won
                if (this.y <= 0) {
                    let myself = this;
                    //pause a half second before returning player to starting position
                    setTimeout(function () { myself.resetPosition(); }, 500);
                }
                break;
            case 'down':
                if (this.y <= 332) {
                    this.y += 83;
                }
                break;
        } 
    }
}

// Now instantiate your objects.
// Place all player objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(100, 62, 'images/enemy-bug.png', 400), new Enemy(200, 145, 'images/enemy-bug.png', 200), new Enemy(-150, 228, 'images/enemy-bug.png', 300)];
let player = new Player(202, 374, 'images/char-boy.png');

console.log(player);
console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
