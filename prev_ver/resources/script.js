document.addEventListener("DOMContentLoaded", function(e){
    let p1 = document.getElementById("player1");                            
    let p1_ones = document.getElementById("player1_ones"); ////objekt
    let p1_twos = document.getElementById("player1_twos");
    let p1_threes = document.getElementById("player1_threes");
    let p1_fours = document.getElementById("player1_fours");
    let p1_fives = document.getElementById("player1_fives");
    let p1_sixes = document.getElementById("player1_sixes");
    let p1_sum = document.getElementById("player1_sum");
    let p1_bonus = document.getElementById("player1_bonus");

    let p1_sum_array = [p1_ones.value,  ////Amanda: Behövs den här arrayen längre?
                        p1_twos.value, 
                        p1_threes.value, 
                        p1_fours.value, 
                        p1_fives.value, 
                        p1_sixes.value];  
    let sum = 0;
    p1_ones.addEventListener("change", function(event){
           
        sum +=Number(p1_ones.value);   ////Amanda: Omvandlar p1_ones.value till number och adderar till summan
           /* for (x of p1_sum_array) { ////Amanda: Behöver inte gå igenom hela arrayen om vi bara behöver ettorna
                let y=Number(x);
                console.log(y);
                let y = parseInt(x);
                if (isNaN(x)) {        ////Erika: Bytte ut vår "kolla om det är nummer" kod till denna. Den gamla slutatde funka
                y = 0;
                }
                
            }

         
        /*  if (!x || x === NaN) {   
                x = 0;
            }   */                

        p1_sum.innerHTML = sum;
        
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } else {
            p1_bonus.innerHTML = 0;
        }

    });
    p1_twos.addEventListener("change", function(event){
        p1_sum.innerHTML = addToSum(p1_twos.value);
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } 
        else {
            p1_bonus.innerHTML = 0;
        }

    });
    p1_threes.addEventListener("change", function(event){
        p1_sum.innerHTML = addToSum(p1_threes.value);
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } 
        else {
            p1_bonus.innerHTML = 0;
        }

    });
    p1_fours.addEventListener("change", function(event){
        p1_sum.innerHTML = addToSum(p1_fours.value);
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } 
        else {
            p1_bonus.innerHTML = 0;
        }

    });
    p1_fives.addEventListener("change", function(event){
        p1_sum.innerHTML = addToSum(p1_fives.value);
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } 
        else {
            p1_bonus.innerHTML = 0;
        }

    });
    p1_sixes.addEventListener("change", function(event){
        p1_sum.innerHTML = addToSum(p1_sixes.value);
        if (sum >= 63) {
            p1_bonus.innerHTML = 50;
        } 
        else {
            p1_bonus.innerHTML = 0;
        }

    });

    function addToSum(x){
        sum+=Number(x);
        return sum;
    }

    function countDice(dice_array) {
        let values_array = []; ////Skapa en tom array
    
        for (let i = 0; i <= 6; i++) { //// assignar värdet 0 till varje index i values
            values_array[i] = 0;
        }
    
        // [0, 0, 0, 0, 0, 0, 0]    //// arrayen nu
        // [0, 1, 2, 3, 4, 5, 6]    //// arrayens index
    
        for (let current_dice of dice_array) { 
            values_array[current_dice]++;
        }
    
        return values_array;
    
    }
    
    
    function calcFullHouse(numbers_array) {
        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        let pair = 0;
        let three_kind = 0;
        let full_house_score = 0;
    
        if (arr.indexOf(2) > 0) {
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
    
    console.log(calcFullHouse([5, 5, 6, 6, 6]));


    //! Random dice function
    function diceRandomizer() {         ////  slumpa fram fem tärningsvärden
        let dice_throw = [];
        for (let i = 0; i < 5; i++) {                           ////   slumpa siffra 5ggr med max värde NÄSTAN 6   
            dice_throw[i] = Math.floor(Math.random() * 6) + 1;  ////   runda ner (blir max 5) +1 så ingen blir noll
        }
        
        return dice_throw;
    }
    

});





// let  = document.getElementById("headline");
// let old_text = headline_variable.innerHTML; 

// console.log(old_text);
// headline_variable.style.color = "red";