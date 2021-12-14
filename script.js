const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '-';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }

    // creates a random field by inputing width, height and the percentage you want to be holes
    static createField(width, height, percentageHoles) {
        let totalTiles = width*height;
        let totalHoles = totalTiles*percentageHoles;
        let randomWidth = Math.floor(Math.random() * width + 1);
        let randomHeight = Math.floor(Math.random() * height + 1);


        let returnField = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push("-");
            }
            returnField.push(row);
        }

        function replaceRandomElement(iterationCount, symbol) {
            for (let i = 0; i < iterationCount; i++) {
                let randomWidth = Math.floor(Math.random() * width);
                let randomHeight = Math.floor(Math.random() * height);  
                returnField[randomHeight][randomWidth] = symbol;
            }
        }
        replaceRandomElement(totalHoles, hole);
        replaceRandomElement(1, pathCharacter);
        replaceRandomElement(1, hat);

        return returnField;
    }

    //prints the field
    printField() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(""));
        }
    }
    // finds the starting location by locating the pathCharacter (*)
    findStartingLocation () {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if(this.field[i][j] === pathCharacter) {
                    return [i,j];
                }
            }
        }
    }

    // checks the symbol of the input character to see if you win, lose or continue the game 
    checkCharacter (char) {

        switch(char) {
            case (hat):
                console.log("You found the hat!");
                process.exit();
            case (hole):
                console.log("You stepped in a hole and lost.");
                process.exit();
            case (fieldCharacter):
                break;
            default:
                console.log("You ran out of bounds!");
                process.exit();
        }
    }
    
    play() {
        console.clear();
        // finds the starting y and x values by using findStartingLocation()
        let currentY = this.findStartingLocation()[0];
        let currentX = this.findStartingLocation()[1];

        while(true) {
            this.printField();  // prints field
            console.log("-------------------"); // creates a block between board and user input

            const move = prompt('Which way? ');
            // validates where to move based on input
            switch(move) {
                case "d":
                    currentY += 1;
                    break;
                case "u":
                    currentY -= 1;
                    break;
                case "l":
                    currentX -= 1;
                    break;
                case "r":
                    currentX += 1;
                    break;
            }

            // checks the character (*, ^, - or O) you are moving to by using .checkCharacter
            this.checkCharacter(this.field[currentY][currentX]);
            //changes the used field to a path (*)
            this.field[currentY][currentX] = "*";

            console.clear();
        }
    }

}

//creating a random field that is 10 wide, 6 high and 40% holes
const yourField = new Field(Field.createField(10, 6, 0.4));
yourField.play();
