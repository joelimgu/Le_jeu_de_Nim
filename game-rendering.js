

const game = [1,3,5]
const playerMoves = Array(game.length).fill(0)

function removeElementEvent(event) {
    const id = event.target.parentElement.id
    const lineID = id[id.length-1]
    console.log(lineID)
    playerMoves[lineID] += 1
    event.target.remove()
}

function createStick() {
    const li = document.createElement('div')
    li.className = "item"
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
    Array.from(lines.children)[ln].appendChild(createStick())
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

// const elements = document.getElementsByClassName("item")
// for ( const el of elements) {
//     el.onclick = (event) => {
//         console.log(this) }
// }

// addChild(0)
// popChild(0)
createGame(game)


// {lineNumber: 5, deletedElements: 3}
