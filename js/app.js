// Enemies our player must avoid
class Enemy {
    constructor(howFast, xPos, yPos) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        //console.log('x:' + xPos + ' y:' + yPos);

        this.sprite = 'images/enemy-bug.png';
        this.howFast = howFast;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.xPos += dt * this.howFast;
        //console.log(this.xPos, this.yPos);
        if (this.xPos >= 505) {
            this.xPos = -125;
        //    this.howFast = 50*(Math.floor(Math.random() * 5));
        }
        
        // collision logic here
        // collisions will only happen on three player position y values - 42, 125 and 208 
        // collisions will only happen on three enemy position y values - 62, 145 and 228 

        let enemyYPos = this.yPos - 20;
        let enemyXPos = this.xPos;

        if ((Math.abs(enemyXPos - player.x) <= 50) && enemyYPos == player.y ){
            player.resetPosition();
        }



    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        // The image/sprite for our player, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';
        this.resetPosition();
    }

    // Update the player's position, required method for game
    update() {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        console.log("player update");
    }

    resetPosition() {
        this.x = 202;
        this.y = 374;
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Handles player keypress input
    handleInput(e) {
        // code goes here
        //console.log("handleInput " + e + ' x' + player.x + ' y' + player.y);
        switch (e) {
            case 'left':
                if (player.x >= 101){
                    player.x -= 101;
                }
                break;
            case 'right':
                if (player.x <= 303) {
                    player.x += 101;
                }
                break;
            case 'up':
                if (player.y >= 42) {
                    player.y -= 83;
                }
                if (player.y <= 0) {
                    //alert ('You won!');
                    setTimeout(function () { player.resetPosition(); }, 500);
                }

                break;
            case 'down':
                if (player.y <= 332) {
                    player.y += 83;
                }
                break;
        } 
        //console.log("handleInput " + e + ' x' + player.x + ' y' + player.y);
    }
}




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
