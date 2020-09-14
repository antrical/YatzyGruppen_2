//! 

function countDice(dice_array) {
    let values_array = []; ////Skapa en tom array

    for (let i = 0; i <= 6; i++) { //// assignar värdet 0 till varje index i values
        values_array[i] = 0;
    }

    // [0, 0, 0, 0, 0, 0, 0]    //// arrayen nu
    // [0, 1, 2, 3, 4, 5, 6]    //// arrayens index

    for (let current_dice of dice_array) { //// +1 i det index som varje tärning hör till
        values_array[current_dice]++;
    }

    return values_array;
}
/* 
fuction calcFullHouse(array) */
// let diceCount = countDice([5, 5, 6, 6, 6]);
// console.log(diceCount);



function calcFullHouse(numbers_array) {
    let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
    let pair = 0;
    let three_kind = 0;
    let full_house_score = 0;

    if (arr.indexOf(2) > 0) {  //men vad händer om vi har 2 par? till ex[2,2,1,3,3]?
        pair = arr.indexOf(2); //// .indexOf letar efter värdet 2, returnar indexet
    }
    if (arr.indexOf(3) > 0) {
        three_kind = arr.indexOf(3); //// returnar index av ev värde 3 i arrayen
    }

    if (pair > 0 && three_kind > 0) { //// om det är en kåk, spara totala summan
        full_house_score = (pair * 2) + (three_kind * 3);
    }

    return full_house_score;    //// returnar värde 0 om ej kåk, eller summan av kåken

}

// calcFullHouse([5, 5, 6, 6, 6]);
console.log(calcFullHouse([5, 5, 6, 6, 6]));

// const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
// console.log(beasts.indexOf('bison'));
// expected output: 1

function calcYatzy(numArray) {     //// return 50 om 5 av samma
    let arr = countDice(numArray); //// return 50 om ej        
    if (arr.indexOf(5) > 0) {
        return true;
    } else {
        return false;
    }
}

function diceRandomizer() {         ////  slumpa fram fem tärningsvärden
    let dice_throw = [];
    for (let i = 0; i < 5; i++) {                           ////   slumpa siffra 5ggr med max värde NÄSTAN 6   
        dice_throw[i] = Math.floor(Math.random() * 6) + 1;  ////   runda ner (blir max 5) +1 så ingen blir noll
    }
    
    return dice_throw;
}
console.log(calcFullHouse(diceRandomizer()));

function throwDice() {      //// tärningskast och direkt yatzykoll.... vet inte
    let throw_array = diceRandomizer();
    let yatzy = calcYatzy(throw_array);

    if (yatzy) {
        alert("Congratulations! YATZY!!!")
        return 50; //// kan man få in auto innerHTML 50 på spelarens Yetzy här?
    } else {
        for (let i = 0; i < throw_array.length; i++) {      //// vet inte vad jag gör.... räknar upp alla tärningarna /M
            console.log("Dice number " + (i + 1) + ": " + throw_array[i]);
        }
        //// nånting...keep going?
    }
}

throwDice();


