
class Minion {
    constructor(name, size, color, speed) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.speed = speed;
    }
    move() {
        console.log(`${this.name} is moving at a speed of ${this.speed}.`);
    }
}

class Stuart extends Minion {
    constructor() {
        super("Stuart", "Strong", "Yellow", 15);
    }
    playGuitar() {
        let title = document.createElement("h2");
        title.textContent = `${this.name} is playing the guitar!`;
        console.log(`${this.name} is playing the guitar!`);
    }
}

class Kevin extends Minion {
    constructor() {
        super("Kevin", "Fit", "Yellow", 20);
    }
    lead() {
        console.log(`${this.name} is leading the group!`);
    }
}

class Bob extends Minion {
    constructor(name, size, color, speed, decoration) {
        super(name, size, color, speed);
        this.decoration = decoration
    }
    invent() {
        console.log(`${this.name} is inventing something new!`);
    }
}

export { Stuart, Kevin, Bob };
