/**
 * Created by T.J on 1/22/2016.
 */
var tempCharacterArray;

//constructor for the creating a character object
var Character = function (characterType, slotsNeeded, elixirsNeeded, darkElixirsNeeded) {
    this.characterType = characterType;
    this.slotsNeeded = slotsNeeded;
    this.elixirsNeeded = elixirsNeeded;
    this.darkElixirsNeeded = darkElixirsNeeded;
    this.totalNumberOfUnits = document.getElementById(characterType).value;
    this.totalSlotsNeeded = this.totalNumberOfUnits * slotsNeeded;
    this.totalElixirsNeeded = this.totalNumberOfUnits * elixirsNeeded;
    this.totalDarkElixirsNeeded = this.totalNumberOfUnits * darkElixirsNeeded;

};

function calculate() {

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
    var characterArray = [
        giant, healer, barb, arch, goblin, wizard, bomber, pekka, balloon, dragon, minion, hog,
        lava, witch, gollum];


    //console.log("temp array:" + tempCharacterArray.toString() + "\nchar array" + characterArray.toString());

    var maxSlots = document.getElementById("max-slots").value;
    var totalSlots = characterArray.reduce(function (a, b) {
        return a + b.totalSlotsNeeded
    }, 0);
    var totalElixirs = characterArray.reduce(function (a, b) {
        return a + b.totalElixirsNeeded
    }, 0);
    var totalDarkElixirs = characterArray.reduce(function (a, b) {
        return a + b.totalDarkElixirsNeeded
    }, 0);

    document.getElementById("total-slots").innerHTML = totalSlots;
    document.getElementById("total-dark-elixirs").innerHTML = totalDarkElixirs;
    document.getElementById("total-elixirs").innerHTML = totalElixirs;


    /*
     console.log("total elixirs sum: " + characterArray.reduce(function (a, b) {
     return a + b.totalSlotsNeeded
     }, 0));
     */
    //window.alert(Object.keys(giant).map(function (key){return giant[key]}));
    // window.alert(document.getElementById("giant").value);
    validate(maxSlots, totalSlots, characterArray);


}

//validates user input
function validate(maxSlots, totalSlots, characterArray) {
    this.maxSlots = maxSlots;
    this.totalSlots = totalSlots;
    this.characterArray = characterArray;
    var message = "";
    var checkValid = true;


    if (maxSlots > 250 || maxSlots < 0) {
        checkValid = false;
        message += "</br>Max Slots must be less than or equal to 250";
    }

    if (totalSlots > maxSlots) {
        checkValid = false;
        message += "</br>Total slots must not be greater than  max slots";
    }

    //checks if the user input a negative value for the number of units
    if (characterArray.some(function (e) {
            return e.totalNumberOfUnits < 0;
        })) {
        checkValid = false;
        message += "</br>Number of units must not be negative"
    }

    //updates the DOM based on if the checkValid flag is true or false
    if (checkValid === false) {

        characterArray = tempCharacterArray.slice();
        document.getElementById("total-slots").innerHTML = totalSlots + message;
        document.getElementById("totals").style.color = "red";
        document.getElementById("max-slots").style.color = "red";

       /* document.getElementById(characterArray[7].characterType).value =
            characterArray[7].totalNumberOfUnits;
        console.log("False:\ntemp: " + tempCharacterArray[7].totalNumberOfUnits);
        console.log("char: " + characterArray[7].totalNumberOfUnits);*/

        for (var i = 0; i < characterArray.length; i++) {
            document.getElementById(characterArray[i].characterType).value =
                characterArray[i].totalNumberOfUnits;
            console.log(characterArray[i].totalNumberOfUnits)
        }
        //validateCharacters(characterArray);
    }
    else {
        tempCharacterArray = characterArray.slice();
        document.getElementById("total-slots").innerHTML = totalSlots;
        document.getElementById("totals").style.color = "black";
        document.getElementById("max-slots").style.color = "black";

        /*characterArray.forEach(function (e) {
            document.getElementById(e.characterType).defaultValue = e.totalNumberOfUnits;
            console.log(e.characterType + " total slots: " + e.totalNumberOfUnits);
        });*/
        console.log("True:\ntemp: " + tempCharacterArray[7].totalNumberOfUnits);
        console.log("char: " + characterArray[7].totalNumberOfUnits);
    }

}
function characterID(characterArray) {
    this.characterArray = characterArray;
    return characterArray.forEach(function (e) {
        console.log(e.characterType)
    });
}
function validateCharacters(characterArray) {
    this.characterArray = characterArray;
    characterArray.forEach(function (e) {
        document.getElementById(e.characterType).value = e.totalNumberOfUnits
    })
}