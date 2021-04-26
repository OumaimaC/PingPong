Object.defineProperty(exports, "__esModule", { value: true });

//////////// CHARGEMENT DES PRE-REQUIS ///////////////////////

var Ball = require("./Ball");
var Player = require("./Player");

//////////// CHARGEMENT DES PRE-REQUIS ///////////////////////

var Game = /** @class */ (function () {
    function Game() {
        this.initialised = false;
        this.sizeX = 900;
        this.sizeY = 600;
        this.endScore = 8;
        this.end = false;
        this.player1 = new Player.Player(50,this.sizeY/4);  //On centre les joueurs dans leurs parties respectives
        this.player2 = new Player.Player(850,this.sizeY/4);
        this.player3 = new Player.Player(50,(this.sizeY/4)*3);
        this.player4 = new Player.Player(850,(this.sizeY/4)*3);
        this.ball = new Ball.Ball();
    }
    Game.prototype.resetAfterGoal = function (x) {
        this.ball.resetBall(x);
        this.player1.resetSpeed();
        this.player2.resetSpeed();
        this.player3.resetSpeed();
        this.player4.resetSpeed();
    };
    Game.prototype.movePlayers = function () {
        if (this.player1.goUp && (this.player1.posY-(this.player1.height/2) > this.player1.speed)) {
            this.player1.movePlayer();
        }
        if (this.player1.goDown && this.player1.posY+(this.player1.height/2)+this.player1.speed < this.sizeY/2) {
            this.player1.movePlayer();
        }
        if (this.player2.goUp && this.player2.posY-(this.player2.height/2) > this.player2.speed) {
            this.player2.movePlayer();
        }
        if (this.player2.goDown && this.player2.posY+(this.player2.height/2)+this.player2.speed < this.sizeY/2) {
            this.player2.movePlayer();
        }
        if (this.player3.goUp && (this.player3.posY-(this.player3.height/2) > this.player3.speed+this.sizeY/2)) {
            this.player3.movePlayer();
        }
        if (this.player3.goDown && this.player3.posY+(this.player3.height/2)+this.player3.speed < this.sizeY) {
            this.player3.movePlayer();
        }
        if (this.player4.goUp && this.player4.posY-(this.player4.height/2) > this.player4.speed+this.sizeY/2) {
            this.player4.movePlayer();
        }
        if (this.player4.goDown && this.player4.posY+(this.player4.height/2)+this.player4.speed < this.sizeY) {
            this.player4.movePlayer();
        }
    };
    Game.prototype.hasAWinner = function () {
        return this.player1.score >= this.endScore || this.player2.score >= this.endScore;
    };
    Game.prototype.resetGame = function (player1found, player1ready, player2found, player2ready, player3found, player3ready, player4found, player4ready) {
        this.player1 = new Player.Player(50,this.sizeY/4);
        this.player1.find = player1found;
        this.player1.ready = player1ready;

        this.player2 = new Player.Player(850,this.sizeY/4);
        this.player2.find = player2found;
        this.player2.ready = player2ready;  
        
        this.player3 = new Player.Player(50,(this.sizeY/4)*3);
        this.player3.find = player3found;
        this.player3.ready = player3ready;

        this.player4 = new Player.Player(850,(this.sizeY/4)*3);
        this.player4.find = player4found;
        this.player4.ready = player4ready; 

        this.ball = new Ball.Ball();
        this.end = false;
        
        this.initialised = true;
    };
    Game.prototype.distanceXbetweenPlayerAndBall = function (player, ball) {
        return Math.abs(player.posX - ball.posX);
    };
    Game.prototype.distanceYbetweenPlayerAndBall = function (player, ball) {
        return Math.abs(player.posY - ball.posY);
    };
    Game.prototype.collisionBetweenPlayersAndBall = function () {
        if (this.player1.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player1, this.ball) && this.player1.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player1, this.ball)) {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
        if (this.player2.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player2, this.ball) && this.player2.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player2, this.ball)) {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = -1 * speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
        if (this.player3.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player3, this.ball) && this.player3.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player3, this.ball)) {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
        if (this.player4.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player4, this.ball) && this.player4.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player4, this.ball))  {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = -1 * speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
        //this.wallSound.play();
    };
    Game.prototype.collisionBetweenBallAndWall = function () {
        if (this.ball.posX + this.ball.size / 2 >= this.sizeX) {
            this.ball.speedX *= -1;
            this.player1.score += 1;
            this.resetAfterGoal(500);
        }
        if (this.ball.posX - this.ball.size / 2 <= 0) {
            this.ball.speedX *= -1;
            this.player2.score += 1;
            this.resetAfterGoal(200);
        }
        if (this.ball.posY + this.ball.size / 2 >= this.sizeY) {
            this.ball.speedY *= -1;
        }
        if (this.ball.posY - this.ball.size / 2 <= 0) {
            this.ball.speedY *= -1;
        }
        //this.playerSound.play();
    };
    Game.prototype.moveBall = function () {
        this.ball.move();
        this.collisionBetweenBallAndWall();
        this.collisionBetweenPlayersAndBall();
        this.ball.incrementSpeed();
    };
    return Game;
}());

exports.Game = Game;
