

const game = [1,3,  5]
const playerMoves = Array(game.length).fill(0)
const gameHistory = {
    turn: 0,
    player1Moves: [[...playerMoves]],
    player2Moves: [[...playerMoves]]
}
let playerPlaying = "player1Moves";

function startTurn() {
    gameHistory.turn += 1;
    gameHistory.player1Moves.push([...playerMoves])
    gameHistory.player2Moves.push([...playerMoves])
}

function removeElementEvent(event) {
    let id;
    // we handle the cases of pressing the image or the container around it
    if ( event.target.nodeName === "IMG" ) {
        console.log(event.target.parentElement.className)
        id = event.target.parentElement.className
        event.target.parentElement.remove()
    } else {
        console.log(event.target.className)
        id = event.target.className
        event.target.remove()
    }
    const lineID = id[id.length-1]
    gameHistory[playerPlaying][gameHistory.turn][lineID] += 1;
    startTurn()
    console.log(gameHistory)
}

function createStick(ln) {
    const li = document.createElement('div')
    li.className = `item line_${ln}`
    li.setAttribute("onclick","removeElementEvent(event)")
    const img = document.createElement('img')
    img.src = "./stick.png"
    // img.style.width = "25rem"
    li.appendChild(img)
    return li
}

function createLine(id) {
    const li = document.createElement('div')
    li.id = "line-" + id
    li.className = "container"
    return li
}

function addChild(ln) {
    const lines = document.getElementById("playingfield");
    if (!Array.from(lines.children)[ln]) lines.appendChild(createLine(ln));
    Array.from(lines.children)[ln].appendChild(createStick(ln))
}

function popChild(ln, player, playerMoves, game) {
    const lines = document.getElementById("playingfield").children;
    Array.from(lines)[ln].children[0].remove()
    playerMoves[player]
        ? playerMoves[player][ln]++
        : playerMoves[player] = Array(game.length).fill(0)

    return playerMoves
}


function createGame(game) {
    game.forEach( (nbSticks, index) => {
        for (let i = 0; i<nbSticks; i++) addChild(index);
    })
}

createGame(game)
