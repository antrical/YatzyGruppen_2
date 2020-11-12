//// Class for array of (five) dice objects
class FiveDice {
    constructor(current_player, keep_dice_arr = []) { //// innehåller 5 index med value 0 om man INTE vill spara eller värdet på tärningen man VILL spara. 

        this.dice_obj_arr = []; //// Skapar arrayen som ska innehålla 5 tärningar

        this.keep_dice_arr = keep_dice_arr; //// Skapas så vi kan använda keep_dice_arr i vår class.

        for (let i = 0; i < 5; i++) { //// Skapar en ny tärning 5 gånger genom att skapa ett objekt från klassen Dice.Nya tärningen läggs in i dice_obj_array
            this.dice_obj_arr[i] = new Dice(keep_dice_arr[i]); //// Dice kommer ge oss en ny tärning för dom vi vill slå om. Annars ger den oss det gamla värdet.
        }

       /* this.dice_values = []; // [0, 0, 0, 0, 0, 0, 0] //// skapar en array för att sen räkna hur många av varje tärning. Fylls med nollor for now.
        for (let i = 0; i <= 6; i++) {
            this.dice_values[i] = 0;
        }*/

        this.dice_values = new Array(7).fill(0);

        this.calcNumEachVal(); ////Uppdaterar dice values (rad 13)
        
        this.dice_arr = []; // [ x, x, x, x, x ]
        for (let dice of this.dice_obj_arr) {
            this.dice_arr.push(dice.value);
        }


        for (let i = 0; i < 6; i++) {
            let new_value = this.calcBlockOnePossibles(i + 1); //// skickas till filtered reduce metod (rad 50). 
            changeScore(new_value, i, current_player);       //// uppdaterar varje cell i block ett med rätt värde. (Kommer från rad 56 ish) 
        }
        changeScore(this.calcPair(), 6, current_player); //// changeScore(funktion räknar ut om värdet av par() 6 = vilken rad i tablet det ska hamna på, 1 = vilken current_player den ska hamna på)
        changeScore(this.calcTwoPairs(), 7, current_player);
        changeScore(this.calcThreeOfAKind(), 8, current_player);
        changeScore(this.calcFourOfAKind(), 9, current_player);
        changeScore(this.calcSmStraight(), 10, current_player);
        changeScore(this.calcLgStraight(), 11, current_player);
        changeScore(this.calcFullHouse(), 12, current_player);
        changeScore(this.calcChance(), 13, current_player);
        changeScore(this.calcYatzy(), 14, current_player);

    }
    //// puts +1 in each index corresponding to dice numbers
    calcNumEachVal() {                          //// Här fylls dice values på. Räknar ut hur många av varje tärning vi har.
        this.dice_obj_arr.map(curr_val => {     
            this.dice_values[curr_val.value]++;
        })
    }
    //* BLOCK 1 POSSIBLE SCORES                 //// En enda metod för alla celler i block 1
    calcBlockOnePossibles(dice) {               //// Tar emot parameter 1-6 (från rad 27)

        if (this.dice_arr.includes(dice)) {     //// Kollar om den tärningen vi frågar efter finns
            let filtered = this.dice_arr.filter((num) => { //// Om det finns såna tärningar läggs dom in, resten filtreras dom andra bort
                return num === dice;                       //// returner dom num som matchar med dice
            })
            
            let sum = filtered.reduce((accumulator, currentval) => accumulator + currentval); //// räknar ut summan av alla värden i filtered arrayen
            return sum; //// returnar den summan till new_value.

        } else {
            return 0;
        }
    } 
    //* PAIR
    calcPair() {
        let pair = 0;

        for (let i = 0; i < this.dice_values.length; i++) {
            if (this.dice_values[i] > 1) {
                    pair = (i * 2);
            }
        }
        return pair;

    }
    //* TWO PAIRS
    calcTwoPairs() {
        let pairs = 0;
        let paircounter = 0;

        for (let i = 0; i < this.dice_values.length; i++) {
            if (this.dice_values[i] >=2) {
                pairs += (i * 2);
                paircounter++;
            }
        }
        if (paircounter === 2) {
            return pairs;
        } else {
            return 0;
        }
    }
    //* THREE OF A KIND
    calcThreeOfAKind() {  
        let threes = 0;

        for (let i = 0; i < this.dice_values.length; i++) {
            if (this.dice_values[i] >= 3) {
                threes = i * 3;
            }
        }
        return threes;
    }
    //* FOUR OF A KIND
    calcFourOfAKind() {  
        let fours = 0;

        for (let i = 0; i < this.dice_values.length; i++) {
            if (this.dice_values[i] >= 4) {
                fours = i * 4;
            }
        }
        return fours;
    }
    //* HOUSE
    calcFullHouse() {
        let pair = 0;
        let three_kind = 0;
        let full_house_score = 0;
    
        if (this.dice_values.indexOf(2) > 0) {
            pair = this.dice_values.indexOf(2); //// .indexOf letar efter värdet 2, returnar indexet
        }
        if (this.dice_values.indexOf(3) > 0) {
            three_kind = this.dice_values.indexOf(3); //// returnar index av ev värde 3 i arrayen
        }
    
        if (pair > 0 && three_kind > 0) { //// om det är en kåk, spara totala summan
            full_house_score = (pair * 2) + (three_kind * 3);
        }
    
        return full_house_score;    //// returnar värde 0 om ej kåk, eller summan av kåken
    }
    //* SMALL STRAIGHT
    calcSmStraight() {
        let is_sm_straight = 0;
        for (let i = 1; i < 6; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (this.dice_values[i] == 1) {
                is_sm_straight ++;
            }
        }
        if (is_sm_straight === 5) { 
            return 15;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }
    //* LARGE STRAIGHT
    calcLgStraight() {
        let is_lg_straight = 0;
        for (let i = 2; i < 7; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (this.dice_values[i] == 1) {
                is_lg_straight ++;
            }
        }
        if (is_lg_straight === 5) { 
            return 20;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }
    //* CHANCE
    calcChance() {
        let total = 0;
        for (let num of this.dice_arr) {
            total += num;
        }
        /* let total = this.dice_arr.reduce((prev_die, curr_die) => {
            parseInt(curr_die);
            return prev_die + curr_die.value;
        }, 0);*/
        
        return total;

    }
    //* YATZY
    calcYatzy() {
        if (this.dice_values.includes(5)) {
            return 50;
        }
        else {
            return 0;
        }
    }
}

