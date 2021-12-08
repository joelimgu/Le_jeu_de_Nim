

let game = [1,3,10]
for ( let i = 0; i<100; i++) game.push(5);
const playerMoves = Array(game.length).fill(0)
const gameHistory = {
    turn: 0,
    player1Moves: [[...playerMoves]],
    player2Moves: []
}
let playerPlaying = "player1Moves";

function startTurn() {
    if ( playerPlaying === "player1Moves" ) playerPlaying = "player2Moves"
    gameHistory.turn += 1;
    gameHistory[playerPlaying].push([...playerMoves])
}

function playTurn(element){
    const id = element.className
    const lineID = id[id.length-1];
    const hasPlayed = gameHistory[playerPlaying][gameHistory.turn].reduce((prev, curr) =>  curr+prev, 0) > 0
    const isPlayingInTheSameLine = gameHistory[playerPlaying][gameHistory.turn][lineID] > 0
    if ( !hasPlayed || isPlayingInTheSameLine ) {
        gameHistory[playerPlaying][gameHistory.turn][lineID] += 1;
        element.remove()
    }
}

function removeElementEvent(event) {
    let id;
    let lineID;
    // we handle the cases of pressing the image or the container around it
    if ( event.target.nodeName === "IMG" ) {
        playTurn(event.target.parentElement)
    } else {
        playTurn(event.target)
    }

    // startTurn()
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
