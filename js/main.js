(() => {
    const buttonCon = document.querySelector('.button-con');
    const startButton = document.querySelector('.start-button');
    console.log(startButton);
    const characters = document.querySelectorAll('.character');

    let chosenCharacter = null;
    let highlightedCharacter = null;

    for (let i = 0; i < characters.length; i++) {
        characters[i].addEventListener('click', function(event) {
            if (highlightedCharacter !== null) {
                highlightedCharacter.style.border = '';
            }

            chosenCharacter = event.target;
            chosenCharacter.style.border = '5px solid #9a4e2c';
            highlightedCharacter = chosenCharacter;
        });
    }


    startButton.addEventListener('click', function() {
        if (chosenCharacter === null) {
            // Show a message if no character is chosen
            const errorElement = document.createElement('h2');
            errorElement.textContent = 'Please choose one character before the game starts.';
            buttonCon.appendChild(errorElement);
        } else {
            startGame(chosenCharacter);
        }
    });

    function startGame(character) {
        // Here its is gonna be the logic to start the game with the chosen character
        localStorage.setItem('chosenCharacter', character.src);

        window.open('game.html', '_self');

    }
})();