window.onload = function() {
    const chosenCharacter = localStorage.getItem('chosenCharacter');
    const characterImage = new Image();
    characterImage.src = chosenCharacter;

    let position = { x: 0, y: 0 };
    const speed = 2;
    
    //Define the size of the image
    const imageWidth = 14;
    const imageHeight = 23;

    characterImage.onload = function() {
        const canvas = document.getElementById('game-canvas');
        const context = canvas.getContext('2d');

        window.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowUp':
                    position.y -= speed;
                    break;
                case 'ArrowDown':
                    position.y += speed;
                    break;
                case 'ArrowLeft':
                    position.x -= speed;
                    break;
                case 'ArrowRight':
                    position.x += speed;
                    break;
            }
        });

        function gameLoop() {

            context.clearRect(0, 0, canvas.width, canvas.height);


            context.drawImage(characterImage, position.x, position.y, imageWidth, imageHeight);


            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }
}