export function playGame() {
    window.onload = function() {
        const canvas = document.querySelector('#canvas');
        if (!canvas) {
            console.error('Canvas not found!');
            return;
        }
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
    
        const FR = 10;
        const S = 20;
        const T = canvas.width / S;
        let pos = { x: 10, y: 10 };
        let vel = { x: 0, y: 0 };
        let snake = [{ x: pos.x, y: pos.y }];
        let food = { x: Math.floor(Math.random() * T), y: Math.floor(Math.random() * T) };
    
        // Use localStorage to get the selected character image
        let snakeImage = new Image();
        let foodImage = new Image();
        snakeImage.src = localStorage.getItem('chosenCharacter') || 'images/minions/Bob.svg';
        const foodImages = ['images/minions/Kevin.svg', 'images/minions/Stuart.svg', 'images/minions/Bob.svg'];
        foodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];
    
        function gameLoop() {
            if (vel.x || vel.y) {
                // Calculate the new position of the snake head
                let newHead = { x: snake[0].x + vel.x, y: snake[0].y + vel.y };
    
                // Detect game end conditions
                if (newHead.x < 0 || newHead.x >= T || newHead.y < 0 || newHead.y >= T || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    alert("Game Over!");
                    document.location.reload();
                    return;
                }
    
                // if get food
                if (newHead.x === food.x && newHead.y === food.y) {
                    snake.push({}); //Grow the snake body
                    randomFood(); // Generate new food
                } else {
                    snake.pop(); //Move the snake body
                }
    
                snake.unshift(newHead);
            }
    
            //Draw the game screen
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            snake.forEach(segment => ctx.drawImage(snakeImage, segment.x * S, segment.y * S, S, S));
            ctx.drawImage(foodImage, food.x * S, food.y * S, S, S);
    
            setTimeout(gameLoop, 1000 / FR);
        }
    
        function randomFood() {
            food = { x: Math.floor(Math.random() * T), y: Math.floor(Math.random() * T) };
            foodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];
        }
    
        document.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'ArrowUp': if (vel.y === 0) vel = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (vel.y === 0) vel = { x: 0, y: 1 }; break;
                case 'ArrowLeft': if (vel.x === 0) vel = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (vel.x === 0) vel = { x: 1, y: 0 }; break;
            }
        });
    
        gameLoop();
    };
    
}