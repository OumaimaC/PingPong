Object.defineProperty(exports, "__esModule", { value: true });

//////////// CHARGEMENT DES PRE-REQUIS ///////////////////////

var Game = require("./Game/Game");
var Info = require("./Game/Info");
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './Client/index.html'));
});
app.get('/display', function (req, res) {
    res.sendFile(path.join(__dirname, './Client/gameClient.js'));
});
app.get('/keycode', function (req, res) {
    res.sendFile(path.join(__dirname, './Client/game.keycode.js'));
});

////////////////////////////////////////////////////////////////////

var player1;
var player2;
var player3;
var player4;
var game = new Game.Game();
var gameEnd = function () {
    if (game.hasAWinner()) {
        if (Math.abs(game.player1.score - game.player2.score) <= 1) {
            game.endScore += 1;
        }
        else {
            game.end = true;
            game.player1.ready = false;
            game.player2.ready = false;
            game.player3.ready = false;
            game.player4.ready = false;
            game.initialised = false;
        }
    }
};
var movePlayers = function () {
    game.movePlayers();
};
var moveBall = function () {
    game.moveBall();
};
var init = function () {
    game.resetGame(game.player1.find, game.player1.ready, game.player2.find, game.player2.ready, game.player3.find, game.player3.ready, game.player4.find, game.player4.ready);
};
var gameInfo = function () {
    var info = new Info.Info(game);
    return info;
};
var play = function () {
    if (!game.end) {
        moveBall();
        movePlayers();
        io.emit("render", gameInfo());
        gameEnd();
        setTimeout(play, 1000 / 60);
    }
    else {
        io.emit('gameEnd', game);
    }
};
io.on('connection', function (socket) {
    if (!game.player1.find) {
        player1 = socket;
        player1.emit('launch', {});
        game.player1.find = true;
        player1.on('disconnect', function (msg) {
            game.player1.find = false;
            player1.disconnect(true);
        });
        player1.on('moveData', function (data) {
            if (data && data !== undefined) {
                game.player1.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player1.goDown = data.goDown;
            }
        });
        player1.on('ready', function (msg) {
            game.player1.ready = true;
            if (game.player2.ready&& game.player3.ready && game.player4.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player1.emit('wait', {});
            }
        });
    }
    else if (!game.player2.find) {
        player2 = socket;
        game.player2.find = true;
        player2.emit('launch', {});
        player2.on('disconnect', function (msg) {
            game.player2.find = false;
            player2.disconnect(true);
        });
        player2.on('moveData', function (data) {
            if (data && data.goUp !== undefined) {
                game.player2.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player2.goDown = data.goDown;
            }
        });
        player2.on('ready', function (msg) {
            game.player2.ready = true;
            if (game.player1.ready && game.player3.ready && game.player4.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player2.emit('wait', {});
            }
        });
    }
    else if (!game.player3.find) {
        player3 = socket;
        game.player3.find = true;
        player3.emit('launch', {});
        player3.on('disconnect', function (msg) {
            game.player3.find = false;
            player3.disconnect(true);
        });
        player3.on('moveData', function (data) {
            if (data && data.goUp !== undefined) {
                game.player3.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player3.goDown = data.goDown;
            }
        });
        player3.on('ready', function (msg) {
            game.player3.ready = true;
            if (game.player1.ready&& game.player2.ready && game.player4.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player3.emit('wait', {});
            }
        });
    }
    else if (!game.player4.find) {
        player4 = socket;
        game.player4.find = true;
        player4.emit('launch', {});
        player4.on('disconnect', function (msg) {
            game.player4.find = false;
            player4.disconnect(true);
        });
        player4.on('moveData', function (data) {
            if (data && data.goUp !== undefined) {
                game.player4.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player4.goDown = data.goDown;
            }
        });
        player4.on('ready', function (msg) {
            game.player4.ready = true;
            if (game.player1.ready&& game.player2.ready && game.player3.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player4.emit('wait', {});
            }
        });
    }
});

http.listen(8050, function () { }); //Server TD3 sur le port 8050 (localhost:8050)
