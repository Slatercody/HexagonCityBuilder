"use strict"
var Game = {};

Game.NewSquare = function (index, resourceArray) {
    if (resourceArray != null) {
        var resource = Game.GetNewResource(resourceArray, index);
    } else {
        var resource = Game.Resource("blank");
    }
    var hexa = document.createElement('div');
    hexa.className = "hexagon";

    var tile = document.createElement('a');
    tile.className = "tile " + resource.type;
    tile.onclick = OHBABY
    //tile.innerHTML = "<a onlclick='OHBABY();'></a>"
    //var a = document.createElement('a');
    //a. = "OHBABY()";
    //tile.appendChild(a);
    hexa.appendChild(tile);
    return { index: index, resource: resource, owned: false, owner: undefined, markup: hexa};
};

Game.NewPlayer = function (name, color) {
    return { name: name, color: color }
};

Game.Resource = function (type) {
    return {type: type, owned: false}
}

Game.NewBoard = function (gameSize, players, colors) {
    var numResources = getResourceAmount(gameSize);
    var board = [];
    var resourceArray = {
        amountAllowed: Math.floor((1/3) * numResources),
        actualAmount: [0,0,0,0,0,0]
    };
    for (var x = 0; x < numResources - 5; x++) {
        board[x] = Game.NewSquare(x, resourceArray);
    };
    while (board.length != numResources) {
        board.push(Game.NewSquare(board.length-1))
    }
    return board;
};

//PORTAL:
//If you settle here you get to place your settlement anywhere you want on your next turn
//Also discard your hand on your next turn

Game.Resources = ["R1", "R2", "R3", "R4", "R5", "R6", "portal"];

Game.GetNewResource = function (NR, index) {
    var invalidResource = true;
    while (true) {
        var random6 = Math.floor((Math.random() * 6));
        if (NR.actualAmount[random6] < NR.amountAllowed) {
            NR.actualAmount[random6] += 1;
            return Game.Resource(Game.Resources[random6]);
        }
    }
};

function getResourceAmount(gameSize) {
    return gameSize + 2 * GRA(gameSize - 1);
};

function GRA(a) {
    if (a == 0) {
        return a;
    } else {
        return a + GRA(a - 1);
    }
};

function MakeBoard(board, gameSize) {
    var style = document.createElement('style');
    style.type = 'text/css';
    var csshtml = "";
    for (var i = 0; i < gameSize; i++) {
        csshtml += '.row' + i + '{margin-left:' + i * 52 + 'px;}';
    };
    style.innerHTML = csshtml;
    document.getElementsByTagName('head')[0].appendChild(style);

    var gui = document.createElement('div');
    gui.id = "board";
    var outer = 0;
    var inner = gameSize;
    var timesAround = 0;
    var index = 0;
    for (i = 1; i <= gameSize; i++) {
        var row = document.createElement('div');
        row.className = "row row" + (gameSize - i);
        for (var x = 0; x < i; x++) {
            row.appendChild(board[index].markup)
            index++;
        }
        gui.appendChild(row);
    }
    for (i = gameSize - 1; i > 0; i--) {
        var row = document.createElement('div');
        row.className = "row row" + (gameSize - i);
        for (var x = 0; x < i; x++) {
            row.appendChild(board[index].markup)
            index++;
        }
        gui.appendChild(row);
    }

    //console.log(board.length)
    //while (outer < board.length/2) {
    //    var row = document.createElement('div');
    //    row.className = "row" + timesAround;
    //    while (inner != 0) {
    //        row.appendChild(board[outer].markup);
    //        inner--;
    //        outer++;
    //    };
    //    timesAround++;
    //    inner = gameSize - timesAround;
    //    gui.appendChild(row);
    //}
    //console.log(gui)
    document.getElementById('body').appendChild(gui);
    //console.log(document.getElementsByTagName('body'))
};
//MakeBoard(Game.NewBoard(8,null,null), 8);

function OHBABY() {
    console.log("OH BABY")
}
OHBABY();