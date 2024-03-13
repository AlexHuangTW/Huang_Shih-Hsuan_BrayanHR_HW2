export function playGame() {
    window.onload = function() {
        const canvas = document.getElementById('canvas');
        if (!canvas) {
            console.error('Canvas not found!');
            return;
        }

        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            if (window.innerWidth <= 500) {
                canvas.width = 300;
                canvas.height = 300;
            } else {
                canvas.width = 400;
                canvas.height = 400;
            }
        }
        // Call resizeCanvas when the script loads
        resizeCanvas();
        
        window.addEventListener('resize', resizeCanvas);

        const FR = 10;
        const S = 20;
        const T = canvas.width / S;
        let pos = { x: 10, y: 10 };
        let vel = { x: 0, y: 0 };
        let minion = [{ x: pos.x, y: pos.y }];
        let food = { x: Math.floor(Math.random() * T), y: Math.floor(Math.random() * T) };

        let minionImageSrc = localStorage.getItem('chosenCharacterSrc') || 'images/minions/Bob.svg';


        let minionImage = new Image();
        let foodImage = new Image();

        const foodImages = ['images/minions/Kevin.svg', 'images/minions/Stuart.svg', 'images/minions/Bob.svg'];
        foodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];

        minionImage.onload = () => {

            gameLoop();
        };

        minionImage.onerror = () => {
            console.error('Failed to load minion image');
        };

        // Ensures that the minion image is set last to start the game loop after the image is loaded
        minionImage.src = minionImageSrc;

        function gameLoop() {
            if (vel.x || vel.y) {
                let newHead = { x: minion[0].x + vel.x, y: minion[0].y + vel.y };

                if (newHead.x < 0 || newHead.x >= T || newHead.y < 0 || newHead.y >= T || minion.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    //Create a new div element
                    const gameOverMessage = document.createElement('div');
                    //Set the content of the div
                    gameOverMessage.textContent = "Game Over!";

                    gameOverMessage.style.position = 'absolute';
                    gameOverMessage.style.top = '50%';
                    gameOverMessage.style.left = '50%';
                    gameOverMessage.style.transform = 'translate(-50%, -50%)';
                    gameOverMessage.style.fontSize = '24px';
                    gameOverMessage.style.color = 'red';
                    // Make sure the message is displayed at the top
                    gameOverMessage.style.zIndex = '1000'; 
                    gameOverMessage.style.backgroundColor = 'white';
                    gameOverMessage.style.padding = '10px';
                    gameOverMessage.style.borderRadius = '5px';
            
                    //Add it to body
                    document.body.appendChild(gameOverMessage);
            
                    // To be able to restart the game, you can automatically refresh the page after a few seconds or add a button to refresh manually
                    setTimeout(function() {
                        document.location.reload();
                    }, 3000); // Reload the page after 3 seconds
                    return;
                }
            

                if (newHead.x === food.x && newHead.y === food.y) {
                    minion.push({});
                    randomFood();
                } else {
                    minion.pop();
                }

                minion.unshift(newHead);
            }

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            minion.forEach(segment => ctx.drawImage(minionImage, segment.x * S, segment.y * S, S, S));
            ctx.drawImage(foodImage, food.x * S, food.y * S, S, S);

            setTimeout(gameLoop, 1000 / FR);
        }

        function randomFood() {
            food = { x: Math.floor(Math.random() * T), y: Math.floor(Math.random() * T) };
            foodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];
        }

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp': if (vel.y === 0) vel = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (vel.y === 0) vel = { x: 0, y: 1 }; break;
                case 'ArrowLeft': if (vel.x === 0) vel = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (vel.x === 0) vel = { x: 1, y: 0 }; break;
            }
        });
    };
}
