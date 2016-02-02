"use strict"
var Game = {};

Game.NewSquare = function (index, resourceArray) {
    if (resourceArray != null) {
        var resource = Game.GetNewResource(resourceArray, index);
    } else {
        var resource = Game.Resource("blank");
    }

    return { index: index, resource: resource , owned: false, owner: undefined };
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

console.log(Game.NewBoard(8,null,null));