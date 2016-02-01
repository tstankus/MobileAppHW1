/**
 * Created by T.J on 1/22/2016.
 */

var tempCharacterArray; //temp array to store previous calculations
var tempMaxSlots; //temp variable to store previous max slots value

//constructor for the creating a character object
var Character = function (characterType, slotsNeeded, elixirsNeeded, darkElixirsNeeded) {
    this.characterType = characterType;
    this.totalNumberOfUnits = document.getElementById(characterType).value;
    this.totalSlotsNeeded = this.totalNumberOfUnits * slotsNeeded;
    this.totalElixirsNeeded = this.totalNumberOfUnits * elixirsNeeded;
    this.totalDarkElixirsNeeded = this.totalNumberOfUnits * darkElixirsNeeded;

};

//creates all the character objects
function createCharacters() {
    var giant = new Character("giant", 5, 3000, 0);
    var healer = new Character("healer", 14, 10000, 0);
    var barb = new Character("barb", 1, 200, 0);
    var arch = new Character("arch", 1, 400, 0);
    var goblin = new Character("goblin", 1, 100, 0);
    var wizard = new Character("wizard", 4, 3500, 0);
    var bomber = new Character("bomber", 2, 3000, 0);
    var pekka = new Character("pekka", 25, 32000, 0);
    var balloon = new Character("balloon", 5, 3500, 0);
    var dragon = new Character("dragon", 20, 33000, 0);
    var minion = new Character("minion", 2, 0, 10);
    var hog = new Character("hog", 5, 0, 65);
    var lava = new Character("lava", 30, 0, 390);
    var witch = new Character("witch", 8, 0, 250);
    var gollum = new Character("gollum", 30, 0, 450);

    return [giant, healer, barb, arch, goblin, wizard, bomber, pekka, balloon, dragon, minion, hog,
        lava, witch, gollum];
}

function initialize() {

    var characterArray = createCharacters();
    var totalSlots = calculateTotalSlots(characterArray);
    var maxSlots = document.getElementById("max-slots").value;
    validate(maxSlots, totalSlots, characterArray);
}

//validates user input
function validate(maxSlots, totalSlots, characterArray) {
    var message = "";
    var checkValid = true;

    if (maxSlots > 250 || maxSlots < 0) {
        checkValid = false;
        message = "\nMax Slots must be positive and less than or equal to 250 ";
    }

    if (totalSlots > maxSlots) {
        checkValid = false;
        message = "\nTotal slots must not be greater than max slots";
    }

    //checks if the user input a negative value for the number of units
    if (characterArray.some(function (e) {
            return e.totalNumberOfUnits < 0;
        })) {
        checkValid = false;
        message = "\nNumber of units must not be negative"
    }

    //updates the DOM based on if the checkValid flag is true or false
    //also alerts the user of any errors and reverts input to previous value if the user input fails validation
    if (checkValid === false) {
        characterArray = tempCharacterArray.slice();
        maxSlots = tempMaxSlots;
        //generates error message
        alert(message);

        //reverts user input to previously entered value
        characterArray.forEach(function (e) {
            document.getElementById(e.characterType).value = e.totalNumberOfUnits;
        });

        document.getElementById("max-slots").value = maxSlots;
        //updates totals after user input was reverted
        calculateTotals(characterArray);
    }
    else {
        tempCharacterArray = characterArray.slice();
        tempMaxSlots = maxSlots;
        calculateTotals(characterArray);
    }
}

//calculates the totals for elixirs, dark elixirs, and slots
function calculateTotals(characterArray) {
    var totalElixirs = characterArray.reduce(function (a, b) {
        return a + b.totalElixirsNeeded
    }, 0);

    var totalDarkElixirs = characterArray.reduce(function (a, b) {
        return a + b.totalDarkElixirsNeeded
    }, 0);

    document.getElementById("total-slots").innerHTML = calculateTotalSlots(characterArray);
    console.log(document.getElementById("total-elixirs").innerHTML = totalElixirs);
    console.log(document.getElementById("total-dark-elixirs").innerHTML = totalDarkElixirs);
}

function calculateTotalSlots(characterArray) {
    return characterArray.reduce(function (a, b) {
        return a + b.totalSlotsNeeded
    }, 0);
}