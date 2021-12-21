

type binNumber = Array<0|1> // array of 0's and 1's

// https://iq.opengenus.org/game-of-nim/


// returns the binary expression of an integer as a binNumber type
function numberToBin(n: number): binNumber {
    const binStr = n.toString(2)
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

// console.log(XORSum([5,1]))
