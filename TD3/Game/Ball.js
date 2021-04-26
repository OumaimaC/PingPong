Object.defineProperty(exports, "__esModule", { value: true });

var Ball = /** @class */ (function () {
    function Ball() {
        this.posX = 450;
        this.posY = 300;
        this.speedX = 5;
        this.speedY = 5;
        this.directionX = 1;
        this.directionY = 1;
        this.size = 15;
    }
    Ball.prototype.resetBall = function (x) {
        this.posX = x;
        this.posY = 300;
        this.speedX = 5 * Math.sign(this.speedX);
        this.speedY = 5;
    };
    Ball.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
    };
    Ball.prototype.incrementSpeed = function () {
        this.speedX += 0.002 * Math.sign(this.speedX);
        this.speedY += 0.002 * Math.sign(this.speedY);
    };
    return Ball;
}());

exports.Ball = Ball;
