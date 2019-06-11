'use strict';

// Enemies our player must avoid
class Enemy {
    constructor(howFast, x, y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        this.sprite = 'images/enemy-bug.png';
        this.howFast = howFast;
        this.x = x;
        this.y = y;
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
    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// player class
class Player {
    constructor() {
        // The image/sprite for our player, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';
        this.resetPosition();
    }

    // Places the player at the starting position
    resetPosition() {
        this.x = 202;
        this.y = 374;
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
                // if the current y position is less than or equal to zero they made it to the river and won
                if (this.y <= 0) {
                    //pause a half second before returning player to starting position
                    setTimeout(function () { player.resetPosition(); }, 500);
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

// I tried the super class / extend technique for the render class but had problems so leaving it the way it is
// got an error in engine.js - TypeError: enemy.render is not a function
// Draw the object on the screen, required method for game
//class render extends Enemy {
//    constructor(sprite, x, y) {
//        super(sprite, x, y);
//        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//    }
//}

// Now instantiate your objects.
// Place all player objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(400, 100, 62), new Enemy(200, 200, 145), new Enemy(300, -150, 228)];
let player = new Player;

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
