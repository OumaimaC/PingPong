Object.defineProperty(exports, "__esModule", { value: true });

var Player = /** @class */ (function () {
    function Player(posX,posY) {
        this.find = false;
        this.ready = false;
        this.posX = posX;
        this.posY = posY;
        this.score = 0;
        this.goUp = false;
        this.goDown = false;
        this.speed = 8;
        this.width = 10;
        this.height = 70;
    }
    Player.prototype.resetSpeed = function () {
        this.speed = 8;
    };
    Player.prototype.movePlayer = function () {
        if (this.goUp) {
            this.posY -= this.speed;
        }
        else if (this.goDown) {
            this.posY += this.speed;
        }
    };
    return Player;
}());

exports.Player = Player;
