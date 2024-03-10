// window.onload = function() {
//     const chosenCharacter = localStorage.getItem('chosenCharacter');
//     const characterImage = new Image();
//     characterImage.src = chosenCharacter;

//     let position = { x: 0, y: 0 };
//     const speed = 2;
    
//     //Define the size of the image
//     const imageWidth = 14;
//     const imageHeight = 23;

//     characterImage.onload = function() {
//         const canvas = document.getElementById('game-canvas');
//         const context = canvas.getContext('2d');

//         window.addEventListener('keydown', function(event) {
//             switch (event.key) {
//                 case 'ArrowUp':
//                     position.y -= speed;
//                     break;
//                 case 'ArrowDown':
//                     position.y += speed;
//                     break;
//                 case 'ArrowLeft':
//                     position.x -= speed;
//                     break;
//                 case 'ArrowRight':
//                     position.x += speed;
//                     break;
//             }
//         });

//         function gameLoop() {

//             context.clearRect(0, 0, canvas.width, canvas.height);


//             context.drawImage(characterImage, position.x, position.y, imageWidth, imageHeight);


//             requestAnimationFrame(gameLoop);
//         }

//         gameLoop();
//     }
// }

window.onload = function() {
    const chosenCharacter = localStorage.getItem('chosenCharacter');
    const characterImage = new Image();
    characterImage.src = chosenCharacter;

    let position = { x: 10 * 20, y: 10 * 20 };
    const speed = 1;
    let vel = {x: 0, y: 0};

    const imageWidth = 20;
    const imageHeight = 20;

    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let snake = [{x: position.x, y: position.y}];
    let food = {x: 0, y: 0, src: ''};

   // Preload Minion image
    const foodImages = {};
    const minions = [
        'images/minions/Stuart.svg',
        'images/minions/Kevin.svg',
        'images/minions/Bob.svg',
    ];
    minions.forEach(src => {
        const img = new Image();
        img.src = src;
        foodImages[src] = img;
    });

    // Randomly generate food locations and select images
    function randomFood() {
        food.x = Math.floor(Math.random() * (canvas.width / imageWidth)) * imageWidth;
        food.y = Math.floor(Math.random() * (canvas.height / imageHeight)) * imageHeight;
        const randomIndex = Math.floor(Math.random() * minions.length);
        food.src = minions[randomIndex];
    }

    randomFood(); //Initialize food

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp': vel = {x: 0, y: -speed}; break;
            case 'ArrowDown': vel = {x: 0, y: speed}; break;
            case 'ArrowLeft': vel = {x: -speed, y: 0}; break;
            case 'ArrowRight': vel = {x: speed, y: 0}; break;
        }
    });

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Update the minion position
        position.x += vel.x;
        position.y += vel.y;

       // Check the game end condition
        if (position.x < 0 || position.x >= canvas.width || position.y < 0 || position.y >= canvas.height) {
            alert("Game Over!");
            // Reload the page and reset the game
            document.location.reload();
            return;
        }

        // draw minion
        snake.unshift({x: position.x, y: position.y});
        if (position.x === food.x && position.y === food.y) {
            // After eating food, the minion grows and generates new food.
            randomFood();
        } else {
            //Mobile minion, no growth
            snake.pop();
        }

        snake.forEach(part => context.drawImage(characterImage, part.x, part.y, imageWidth, imageHeight));

        // draw food
        context.drawImage(foodImages[food.src], food.x, food.y, imageWidth, imageHeight);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
};
