"use strict";
// @ts-ignore
const prompt = require('prompt-sync')();
let fin_du_jeu = false; // represents if the game has ended
/*
    returns the sum of the elements of the list using xor condition
 */
function sumXor(list) {
    if (list.length === 0)
        return 0;
    if (list.length === 1)
        return list[0];
    return list[0] ^ sumXor(list.slice(1));
}
// verifies the parity of a result of the XOR of the list
function pairPosition(list) {
    return sumXor(list) === 0;
}
// Initialise la liste pour le jeu : un élément pour une ligne et chaque
// élément donne le nombre d'allumettes pour cette ligne
function initList() {
    let res = "0";
    const list = [];
    while (res) {
        res = prompt(`Donner le nombre d'allumettes de la ligne n°${list.length} :`);
        if (res && parseInt(res))
            list.push(parseInt(res));
    }
    return list;
}
function affichage(list) {
    list.forEach((el) => {
        let line = "";
        for (let k = 0; k < el; k++) {
            line += " |";
        }
        console.log(line);
    });
}
// Tour de jeu au hasard de l'ordinateur si celui-ci est en position défavorable
// noinspection JSUnusedGlobalSymbols
function playRandomly(list) {
    let line = Math.random() * (list.length - 1); // (0, list.length)
    while (list[line] === 0) {
        line = Math.random() * (list.length - 1); // (0, list.length)
    }
    const numberToRemove = Math.random() * (list.length) + 1; // (0,list.length)
    list[line] -= Math.floor(numberToRemove);
    console.log(`L'ordinateur a enlevé au hasard ${numberToRemove} allumettes à la ligne ${line}`);
}
// Tour de jeu stratégique de l'ordinateur si celui-ci est en position défavorable
function playStrategy(list) {
    let found = false;
    let l = 0;
    let line = undefined;
    let nbToRemove = undefined;
    while (l < list.length && !found) {
        let recup = list[l];
        let nb = 1;
        while (nb <= list[l]) {
            list[l] = recup - nb;
            if (pairPosition(list) && !found) {
                found = true;
                line = l;
                nbToRemove = nb;
            }
            list[l] = recup;
            nb += 1;
        }
        l += 1;
    }
    if (found && line && nbToRemove) {
        list[line] -= nbToRemove;
    }
    else {
        console.log("Erreur, pas de position trouvée");
    }
}
function listMax(list) {
    let lineMax = 0;
    list.forEach((el, index, list) => {
        if (el > list[lineMax]) {
            lineMax = index;
        }
    });
    return lineMax;
}
// noinspection JSUnusedGlobalSymbols
function playStrategyMax(list) {
    const sum = sumXor(list);
    const listMod = [...list]; // deep copy list
    let l = listMax(listMod);
    let found = false;
    if (sum < list[l]) {
        while (!found && listMod[l] !== 0) {
            const recup = list[l];
            list[l] -= sum;
            if (pairPosition(list)) {
                found = true;
                console.log(list);
            }
            else {
                list[l] = recup;
                listMod[l] = 0;
                l = listMax(listMod);
            }
        }
    }
    else {
        playStrategy(list);
    }
}
// Ordinateur joue au hasard s'il est en position défavorable ou joue stratégiquement s'il est
// en position favorable puis on vérifie si l'ordinateur a perdu
function computerTurn(list) {
    console.log("computer's turn");
    if (pairPosition(list)) {
        playRandomly(list);
    }
    else {
        playStrategy(list);
    }
    affichage(list);
    let isListNull = true;
    let l = 0;
    while (l < list.length && isListNull) {
        if (list[l] !== 0) {
            isListNull = false;
        }
        l += 1;
    }
    if (isListNull) {
        fin_du_jeu = true;
        console.log("L'ordinateur a gagné");
    }
}
// Demande au joueur de choisir la ligne et le nombre d'allumettes à enlever puis vérifie si le joueur n'a pas perdu
function playerTurn(list) {
    console.log("player's turn");
    let correct = false;
    let nbToRemove = 0;
    let lineNb = null;
    while (!correct) {
        const lineStr = prompt(`Choisir une ligne entre 0 et ${list.length - 1} :`);
        lineNb = lineStr && parseInt(lineStr) ? parseInt(lineStr) : null;
        if (lineNb && 0 <= lineNb && lineNb < list.length) {
            const p = prompt(`Choisir le nombre d'allumettes à enlever entre 1 et ${list[lineNb]} :`);
            if (p && parseInt(p)) {
                nbToRemove = parseInt(p);
                if (1 <= nbToRemove && nbToRemove <= list[lineNb]) {
                    correct = true;
                }
            }
            else {
                console.log("nombre à enlever incorrect, recommencer");
            }
        }
    }
    list[lineNb ? lineNb : 0] -= nbToRemove;
    affichage(list);
    let isListNull = true;
    let l = 0;
    while (l < list.length && isListNull) {
        if (list[l] != 0) {
            isListNull = false;
        }
        l += 1;
        if (isListNull) {
            fin_du_jeu = true;
            console.log("game ended, player wins");
        }
    }
}
function jeuDeNim() {
    const gameList = initList();
    affichage(gameList);
    let correct = false;
    let start = "player";
    while (!correct) {
        const p = prompt("\nLe joueur commence ? o/n");
        if (p === 'o') {
            correct = true;
            start = "player";
        }
        else if (p === 'n') {
            correct = true;
            start = "computer";
        }
        else {
            console.log("Répondre par 'o' pour oui ou 'n' pour non");
        }
    }
    fin_du_jeu = false;
    if (start === "player") {
        while (!fin_du_jeu) {
            playerTurn(gameList);
            if (!fin_du_jeu)
                computerTurn(gameList);
        }
    }
    else {
        while (!fin_du_jeu) {
            computerTurn(gameList);
            if (!fin_du_jeu)
                playerTurn(gameList);
        }
    }
    console.log("fin du jeu");
}
jeuDeNim();
