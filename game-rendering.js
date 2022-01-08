"use strict";
// const MYAPPVARS = {}
let game = [1, 3, 5];
let difficulty = "Facile";
let updatedGame = [...game]; // this array keeps track of the state of the game
const playerMoves = Array(game.length).fill(0);
const gameHistory = {
    turn: 0,
    player1Moves: [[...playerMoves]],
    player2Moves: []
};
let playerPlaying = "player1Moves";
function playerHasPlayed() {
    return gameHistory[playerPlaying][gameHistory.turn].reduce((prev, curr) => curr + prev, 0) > 0;
}
/**
  Changes the player and go to the following turn, adding at the same time the corresponding arrays in order to store
  next turn moves.
 */
function startTurn() {
    var _a, _b;
    if (!playerHasPlayed()) { // if the player hasn't removed an element don't pass turn
        return;
    }
    console.log("turn");
    // @ts-ignore
    document.getElementById('flash').style.display = "inline";
    // @ts-ignore
    document.getElementById('flash').style.removeProperty("animation");
    // @ts-ignore
    document.getElementById('flash').style.animation = "fadeinout .5s ease-in forwards;";
    setTimeout(() => {
        // @ts-ignore
        document.getElementById('flash').style.display = "none";
    }, 1000);
    if (playerPlaying === "player1Moves") {
        playerPlaying = "player2Moves";
        gameHistory.player2Moves.push([]);
        gameHistory.player1Moves.push([]);
        // @ts-ignore
        (_a = document.getElementById("turnIndicator")) === null || _a === void 0 ? void 0 : _a.style.background = "#596eff";
    }
    else {
        playerPlaying = "player1Moves";
        // @ts-ignore
        (_b = document.getElementById("turnIndicator")) === null || _b === void 0 ? void 0 : _b.style.background = "#fb5043";
    }
    gameHistory.turn += 1;
    gameHistory[playerPlaying].push([...playerMoves]);
    if (/ia/g.test(document.URL)) { // if the AI should play
        makeAIMove(updatedGame);
        startTurn();
        if (hasGameEnded()) {
            endGame(true);
        }
    }
}
/**
 * Ends the game
 */
function endGame(isAIWinner = false) {
    let winingPlayer;
    // @ts-ignore
    document.getElementsByClassName("modal")[0].style.display = "inline-flex";
    if (playerPlaying === "player1Moves") {
        if (/ia/g.test(document.URL)) {
            winingPlayer = "You";
        }
        else {
            winingPlayer = "Red";
        }
    }
    else {
        if (/ia/g.test(document.URL)) {
            winingPlayer = "You";
        }
        else {
            winingPlayer = "Blue";
        }
    }
    if (isAIWinner) {
        winingPlayer = "Computer";
    }
    // @ts-ignore
    document.getElementById("endMessage").innerText = `${winingPlayer} wins! 🥳`;
    // alert(`Player ${playerPlaying} wins! 🥳`)
    console.log("game ended");
}
function hasGameEnded() {
    // returns true if all the elements of the array are 0
    const arrIsAll0 = (arr) => arr.reduce((prev, current) => current === 0 && prev, true);
    return arrIsAll0(updatedGame);
}
/**
 gets the element containing the image and notes the corresponding move in the gameHistory Object.
 */
function playTurn(element) {
    // get the line ID
    const id = element.className;
    const lineID = id[id.length - 1];
    // const playerHasPlayed = gameHistory[playerPlaying][gameHistory.turn].reduce((prev, curr) =>  curr+prev, 0) > 0
    const playerIsPlayingInTheSameLine = gameHistory[playerPlaying][gameHistory.turn][lineID] > 0;
    if (!playerHasPlayed() || playerIsPlayingInTheSameLine) {
        gameHistory[playerPlaying][gameHistory.turn][lineID] += 1;
        updatedGame[lineID] -= 1;
        element.classList.toggle("fade");
        setTimeout(() => {
            element.remove();
        }, 500);
    }
    if (hasGameEnded()) {
        endGame();
    }
}
/**
   removes the element, is the function called on the 'onclick' event in each stick
 */
function removeElementEvent(event) {
    var _a;
    // we handle the cases of pressing the image or the surrounding container
    // @ts-ignore
    if (event && ((_a = event.target) === null || _a === void 0 ? void 0 : _a.nodeName) === "IMG") {
        // @ts-ignore
        playTurn(event.target.parentElement);
    }
    else {
        playTurn(event.target);
    }
    console.log(gameHistory);
}
/**
    creates a stick in the lines passed as argument
    @param ln number
 */
function createStick(ln) {
    const li = document.createElement('div');
    li.className = `item line_${ln}`;
    li.setAttribute("onclick", "removeElementEvent(event)");
    const img = document.createElement('img');
    img.src = "./stick.png";
    // img.style.width = "25rem"
    li.appendChild(img);
    return li;
}
/*
    creates the HtlmElement with teh correct properties and returns it
 */
function createLine(id) {
    const li = document.createElement('div');
    li.id = "line-" + id;
    li.className = "container";
    return li;
}
/**
    adds a child  ( a stick ) to the line passed as argument
    @param ln number
 */
function addChild(ln) {
    console.log(`adding chind in ${ln}`);
    const lines = document.getElementById("playingfield");
    // @ts-ignore
    if (!Array.from(lines.children)[ln])
        lines.appendChild(createLine(ln));
    // @ts-ignore
    Array.from(lines.children)[ln].appendChild(createStick(ln));
}
// /**
//     removes a child
//  */
// function popChild(ln, player, playerMoves, game) {
//     const lines = document.getElementById("playingfield").children;
//     Array.from(lines)[ln].children[0].remove()
//     playerMoves[player]
//         ? playerMoves[player][ln]++
//         : playerMoves[player] = Array(game.length).fill(0)
//
//     return playerMoves
// }
/**
    given an array where the index represents the line and the value the number of sticks in that line it creates
    all the htlm structure required to play the game.
    @param game Array<number>
 */
function createGame(game) {
    game.forEach((nbSticks, index) => {
        console.log(nbSticks);
        console.log("nb");
        for (let i = 0; i < nbSticks; i++)
            addChild(index);
    });
}
/**
 * Removes a stick from the line passed as argument
 * @param line: number
 *
 * @remarks IF the line doesn't exist it does nothing
 */
function removeStick(line) {
    const lineElement = document.getElementById(`line-${line}`);
    lineElement === null || lineElement === void 0 ? void 0 : lineElement.children[0].remove(); // remove a stick from the line if the line exists
    updatedGame[line] -= 1;
}
// createGame(game)
function makeAIMove(game) {
    const move = findMove(game, difficulty);
    console.log(`AI is making the move: line: ${move.line} quantity: ${move.nbToRemove}`);
    for (let i = 0; i < move.nbToRemove; i++) { // remove all the sticks
        removeStick(move.line);
    }
}
/**
 * An event listener listening for the "e" key, so it's easier to end turn.
 */
window.addEventListener("keypress", (event) => {
    console.log(event.key);
    if (event.key === "e") {
        startTurn();
    }
});
