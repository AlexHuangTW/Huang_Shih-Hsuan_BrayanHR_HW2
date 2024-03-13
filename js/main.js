import { Stuart, Kevin, Bob } from "./modules/minionOOP.js";
import { charactersSelect } from "./modules/characters.js";
import { playGame } from "./modules/game.js";

if(document.body.dataset.page === 'index') {
    charactersSelect();
}

if(document.body.dataset.page === 'game') {
    playGame();
}

const minionBob = new Bob(
    "Bob",
    "Fat",
    "yellow",
    "10",
    "teddy bear"
)

console.log(minionBob);
const minionStuart  = new Stuart();
console.log(minionStuart);
minionStuart.playGuitar();
const minionKevin  = new Kevin();
console.log(minionKevin);