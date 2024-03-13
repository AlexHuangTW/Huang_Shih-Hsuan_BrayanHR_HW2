
import { MinionsGame } from "./minionOOP.js"; 
import { playGame } from "./modules/game.js";


if (document.body.dataset.page === 'index') {
    new MinionsGame();
} else if (document.body.dataset.page === 'game') {
    playGame();
}

