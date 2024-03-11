import { charactersSelect } from "./modules/characters.js";
import { playGame } from "./modules/game.js";

if(document.body.dataset.page === 'index') {
    charactersSelect();
}

if(document.body.dataset.page === 'game') {
    playGame();
}