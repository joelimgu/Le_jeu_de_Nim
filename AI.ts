

type binNumber = Array<0|1> // array of 0's and 1's

// https://iq.opengenus.org/game-of-nim/


// returns the binary expression of an integer as a binNumber type
function numberToBin(n: number): binNumber {
    const binStr = n.toString(2)
    // transform the string to array and transform the char to numbers and make TS understand the type correctly
    // we are saying :"trust me it's an array of 1's and 0's"
    return <Array<0 | 1>>binStr.split('').map((el) => Number(el));
}

function addZerosToBinNumber(sigNum: number, n: binNumber): binNumber {
    const len = n.length
    // adds 0's to the start of the array to match the sigNum in length
    for ( let i = 0; i < (sigNum - len); i++ ) {
        n.unshift(0) // adds an element at the start of the list
    }
    return n
}

function XORSum(game: number[]): binNumber {
    // the biggest number of binary digits
    const binResolution: number = Math.max(...game.map( (el) => numberToBin(el).length ))
    // get the game in binary with the same number of digits
    const gameInBin = game.map( (line) => addZerosToBinNumber(binResolution,numberToBin(line)))
    let arrayOfZeros = Array(binResolution).fill(0);
    // Sum without carries  ( element by element XOR ) of all the lines
    return gameInBin.reduce((prev, current) => {
        return prev.map((el, index) => el ^ current[index]) // XOR digit prev[i] XOR curr[i]
    }, arrayOfZeros)
}

/**
 * Retruns true if the list is all 0's
 * @param list: binNumber
 * @returns boolean indicating if it's all 0's or not
 */
function theMoveIsOptimal(list: binNumber): boolean {
    // @ts-ignore
    return list.reduce((prev, current) => {
        return prev && (current === 0);
    }, true);
}

/**
 * Returns a non-cryptographic random number between a and b
 *
 * @param a - The lower interval number
 * @param b - The bigger interval number
 * @returns a random number between a and b
 */
function randInterval(a: number ,b: number): number {
    return Math.floor(Math.random()*b) + a
}

function playRandomMove(game: number[]) {
    console.log("played rand")
    let aux = [...game]
    let randLine = randInterval(0, aux.length - 1);
    while ( aux[randLine] === 0 ) {
        randLine = randInterval(0, aux.length - 1);
    }
    console.log("made random move")
    return {line: randLine, nbToRemove: randInterval(1, aux[randLine])}
}

function playEfficientMove(game: number[]) {
    let move = undefined
    for ( let l = 0; l < game.length; l++ ) {
        for ( let n = 1; n <= game[l] ; n++ ) {
            let aux = [...game] // create a copy of the array
            aux[l] -= n
            if ( theMoveIsOptimal(XORSum(aux)) ) {
                console.log(`found optimal: ${aux}`)
                move = {line: l, nbToRemove: n}
                break
            }
        }
        if ( move ) { // bc undefined is falsy
            break
        }
    }
    if ( !move ) {
        move = playRandomMove(game)
    }
    return move
}

/**
 * try removing one by one all the elements in all the lines
 * until we find an optimal move.
 * An optimal move is defined by having and XORSum un 0...0
 *
 * @param game - number[]
 * @return the optimal move to play
 */
function findMove(game: number[], difficulty: string | undefined): {line: number, nbToRemove: number} {
    let move: {line: number, nbToRemove: number} | undefined = undefined

    if ( difficulty === "facile" ) {
        move = playRandomMove(game)
    } else if ( difficulty === "difficile" ) {
        if ( Math.random() < .5 ) {
            move = playRandomMove(game)
        } else {
            move = playEfficientMove(game)
        }
    } else {
        move = playEfficientMove(game)
    }
    return move
}

// console.log(findMove([4,2,1]))
