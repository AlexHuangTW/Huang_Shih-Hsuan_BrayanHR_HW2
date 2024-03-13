
//Define the Minion class and its subclasses
class Minion {
    constructor(name, size, color, speed, decoration) {
      this.name = name;
      this.size = size;
      this.color = color;
      this.speed = speed;
      this.decoration = decoration;
    }
  
    move() {
      console.log(`${this.name} is moving at a speed of ${this.speed}.`);
    }
  }
  
  class Stuart extends Minion {
    constructor() {
      super("Stuart", "Strong", "Yellow", 15, "none");
      this.imageSrc = 'images/minions/Stuart.svg'; //Add character image path
    }
  
    playGuitar() {
      console.log(`${this.name} is playing the guitar!`);
    }
    // Since Stuart does not have 'lead' or 'eat' behaviors, you can optionally define them here as empty for consistency
    lead() {}
    eat() {}
  }
  
  class Kevin extends Minion {
    constructor() {
      super("Kevin", "Fit", "Yellow", 20, "none");
      this.imageSrc = 'images/minions/Kevin.svg'; //Add character image path
    }
  
    lead() {
      console.log(`${this.name} is leading the group!`);
    }
    // Kevin does not have 'playGuitar' or 'eat' behaviors, define them if needed
    playGuitar() {}
    eat() {}
  }
  
  class Bob extends Minion {
    constructor() {
      super("Bob", "Fat", "Yellow", 10, "Teddy Bear");
      this.imageSrc = 'images/minions/Bob.svg'; //Add character image path
    }
  
    eat() {
      console.log(`${this.name} is eating food!`);
    }
    // Bob does not have 'playGuitar' or 'lead' behaviors, define them if needed
    playGuitar() {}
    lead() {}
  }
  

    
  //Define the MinionsGame class
  class MinionsGame {
    
    constructor() {
      this.minions = {
        Stuart: new Stuart(),
        Kevin: new Kevin(),
        Bob: new Bob(),
      };
      this.initGame();
      this.printMinionsDetails();
    }
  
    initGame() {
      const characters = document.querySelectorAll('.character');
  
      let chosenCharacter = null;
  
      characters.forEach(character => {
        character.addEventListener('click', () => {
          if (chosenCharacter) {
            chosenCharacter.classList.remove('highlighted');
            chosenCharacter.style.border = '';
          }
  
          chosenCharacter = character;
          chosenCharacter.classList.add('highlighted');
          //Add border style when you select characters
          chosenCharacter.style.border = '5px solid #9a4e2c';
          gsap.registerPlugin(ScrollToPlugin);
          gsap.to(window, {duration: 1, scrollTo: '#start-button-con'});
   
          // Assume that each role's container has a data-name attribute
          const characterName = character.dataset.name; 
  
          console.log(`${characterName} selected`);
          this.displayCharacterInfo(this.minions[characterName]);
        });
      });
  
      const startButton = document.querySelector('.start-button');
      startButton.addEventListener('click', () => {
        if (!chosenCharacter) {
          alert('Please choose one character before the game starts.');
        } else {
          const characterName = chosenCharacter.dataset.name;
          this.startGame(this.minions[characterName]);
        }
      });
    }

    printMinionsDetails() {
        // Loop through the this.minions object and print the details of each minion
        Object.values(this.minions).forEach(minion => {
          console.log(minion); 
          minion.playGuitar();
          minion.lead();
          minion.eat();
        });
      }

  
    displayCharacterInfo(minion) {
      const infoContainer = document.querySelector('#character-info');
      infoContainer.innerHTML = `
        <p>Name: ${minion.name}</p>
        <p>Size: ${minion.size}</p>
        <p>Color: ${minion.color}</p>
        <p>Speed: ${minion.speed}</p>
        <p>Decoration: ${minion.decoration}</p>
      `;
    }
  

    startGame(selectedMinion) {
        console.log(`Starting game with ${selectedMinion.name}`);
        // Store the selected character's information for use on the game page
        localStorage.setItem('chosenCharacterSrc', selectedMinion.imageSrc);
        // Jump to the game page
        window.location.href = 'game.html';
    }
  }
  
  export { MinionsGame };
  