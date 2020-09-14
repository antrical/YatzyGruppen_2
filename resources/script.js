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
    ////part two
    let p1_pair = document.getElementById("p1_pair");
    let p1_two_pairs = document.getElementById("p1_two_pairs");
    let p1_three_kind = document.getElementById("p1_three_kind");
    let p1_four_kind = document.getElementById("p1_four_kind");
    let p1_sm_str = document.getElementById("p1_sm_str");
    let p1_lg_str = document.getElementById("p1_lg_str");
    let p1_house = document.getElementById("p1_house");
    let p1_chance = document.getElementById("p1_chance");
    let p1_yatzy = document.getElementById("p1_yatzy");
    let p1_total = document.getElementById("p1_total");
    p1.addEventListener("change",function(e){
        p1=p1.value;
    })
    /* p1.addEventListener("change",function(e){
           p1= p1.value;
        })
        let number_array=[];
        roll_dice.addEventListener("click",rollDice);
        
//slumpar värdet



  function rollDice(){
    for(let i=1;i<=5;i++){
    if (document.getElementById("dice_"+i).checked){
    }
    else
{
let slump= Math.floor(Math.random()*6+1);
document.getElementById("image_"+i).src=("dice_img_"+slump+".png")
number_array[(i-1)]=slump;
}}
  console.log (number_array);
  }})*/

    ////tärnings-buttons att trycka på för att spara
    document.getElementById("toggle_1").addEventListener("click", function(event){
        event.preventDefault();
        toggleKeepers(0);
        console.log("toggled");
    });;
    document.getElementById("toggle_2").addEventListener("click", function(event){
        event.preventDefault();
        toggleKeepers(1);
        console.log("toggled");
    });;;
    document.getElementById("toggle_3").addEventListener("click", function(event){
        event.preventDefault();
        toggleKeepers(2);
        console.log("toggled");
    });;;
    document.getElementById("toggle_4").addEventListener("click", function(event){
        event.preventDefault();
        toggleKeepers(3);
        console.log("toggled");
    });;;
    document.getElementById("toggle_5").addEventListener("click", function(event){
        event.preventDefault();
        toggleKeepers(4);
        console.log("toggled");
    });;;
    


    let p1_td_score_array = [
        p1_ones,  ////Amanda: Behövs den här arrayen längre?       Maja: jo hittills iaf!
        p1_twos, 
        p1_threes, 
        p1_fours, 
        p1_fives, 
        p1_sixes
    ];

    let p1_td_second_score_array = [
        p1_pair,
        p1_two_pairs,
        p1_three_kind,
        p1_four_kind,
        p1_sm_str,
        p1_lg_str,
        p1_house,
        p1_chance,
        p1_yatzy
    ];                

    //// tärningar att spara
    let keep_click_arr = [false, false, false, false, false];
    


    let sum = 0;

    //sum +=Number(p1_ones.value); //verkade inte behövas?/M ////Amanda: Omvandlar p1_ones.value till number och adderar till summan
    //// La in Amandas i en loop istället, kallar fortf på Erikas addToSum vid varje td "change"
    //// Varje td score får varsin eventlistener: /M
    for (let td_score of p1_td_score_array) {
        td_score.addEventListener("change", function(event){    //// ändra till click?
            //console.log(td_score);
            p1_sum.innerHTML = addToSum(td_score.value);
            if (sum >= 63) {
                p1_bonus.innerHTML = 50;   //// räkna ut bonus när alla övre td är ifyllda ist?
            } 
            else {
                p1_bonus.innerHTML = 0;
            }
        });
    }

    

    
    
    let roll_dice = document.getElementById("roll_dice");
    let dice_shown_img_arr = new Array(5);
    //// 5 träningar som syns i browsern     (vilket img-element skickar vi ut bilden till)
    dice_shown_img_arr[0] = document.getElementById("dice_cell_1"); 
    dice_shown_img_arr[1] = document.getElementById("dice_cell_2");
    dice_shown_img_arr[2] = document.getElementById("dice_cell_3");
    dice_shown_img_arr[3] = document.getElementById("dice_cell_4");
    dice_shown_img_arr[4] = document.getElementById("dice_cell_5");


    var dice_values_array = new Array(5);

    var throws_left = 3;

    //// tärningsbilder sparade i array
    var dice_png_array = new Array(7);
    dice_png_array[0] = "resources/images/dice/dice-zero.png";
    dice_png_array[1] = "resources/images/dice/dice-one.png"; 
    dice_png_array[2] = "resources/images/dice/dice-two.png";
    dice_png_array[3] = "resources/images/dice/dice-three.png";
    dice_png_array[4] = "resources/images/dice/dice-four.png";
    dice_png_array[5] = "resources/images/dice/dice-five.png";
    dice_png_array[6] = "resources/images/dice/dice-six.png";
    
    //// alla tärningarna har noll från början, ingen tärning har kastats
    for (let i = 0; i < dice_values_array.length; i++) {
        dice_values_array[i] = 0;
    }
    
    //TODO:      ALLMÄN TO-DO LIST                                                         
    //TODO:  ( ) göra td_score klickbara                                                   
    //TODO:  ( ) när man klickar en td_score cell:                                         
    //TODO:  ( )      datan "fixeras" där så något sätt                                    
    //TODO:  ( )      omgången avslutas (tex: throws_left = 0 eller rent av throws_left 3) 
    //TODO:  ( )                         eller nåt mer exotiskt typ sätta igång nästa runda? kanske sen.... X´D 
    //TODO:  ( )      snygga till css knappar osv.. borde synas på dem vilka som är "valda" också               
    //TODO:  ( )      fyll på...                                                           
    //TODO:  ( ) när alla td_scores i övre blocket har "valts" av spelaren räknas bonusen ut och visas
    //TODO:  ( ) när tärningar kastas visas alla möjliga poäng även i övre blocket
    //TODO:  (/) skriv ut summan under övre blocket alltefter deras td score "valts"




    
    //! ROLL DICE   
    //* detta händer när man trycker på knappen vid tärningarna
    roll_dice.addEventListener("click", function(event) {
        let random_throw = randomDiceArray();
        console.log("Fem slumpade tärningar: " + random_throw); // Tärningarna som slumpades fram

        //// & om man har inte slagit tre gånger redan
        if (throws_left > 0) {
            for (let i = 0; i < 5; i++) {

                ////om tärning index [i] inte ska sparas:
                if (!keep_click_arr[i]) {   //// (keep_click_arr[i] === false)
                    dice_shown_img_arr[i].src = dice_png_array[random_throw[i]];  //// byter bild motsvarande randomized tärningskast-array
                    dice_values_array[i] = random_throw[i];

                    
                }   
            }

            //TODO:  Skicka till funktion(er) som räknar ut möjliga td_scores       
            //TODO:  - där OM möjligt score lägg in som värde på td-score           
            //TODO:    ________________________________________                     
            //TODO:                                                                 
            //TODO:    ( ) Pair                                                     
            //TODO:    ( ) Two pairs                                                
            //TODO:    ( ) Four of a kind                                           
            //TODO:    ( ) Three of a kind                                          
            //TODO:    (x) sm_straight                                              
            //TODO:    (x) lg_straight                                              
            //TODO:    (x) Full house                                               
            //TODO:    (x) chance                                                   
            //TODO:    (x) yatzy                                                    
            //TODO:                                                                 



            p1_house.value = calcFullHouse(dice_values_array);   //// Möjlig kåk detta kast? skickar värde
            p1_sm_str.value = calcSmStraight(dice_values_array); //// Möjlig small straight detta kast? skickar värde
            p1_lg_str.value = calcLgStraight(dice_values_array); //// Möjlig large straight detta kast? skickar värde
            p1_yatzy.value = calcYatzy(dice_values_array); //// Möjlig yatzy detta kast? skickar värde
            p1_chance.value = calcChance(dice_values_array); //// Möjlig Chance detta kast? skickar värde

        }
        console.log("Nya tärningskastet med sparade tärningar: " + dice_values_array);
        // throws_left --;  ////pausad tills vidare, slå på sen
    });


    //! TOGGLE KEEP DICE FUNCTION
    function toggleKeepers(i) {
        if (keep_click_arr[i] === true) {
            keep_click_arr[i] = false;
        } else {
            keep_click_arr[i] = true;
        }
    }

    //? RESET TÄRNINGAR till spara ej ==== använd efter en omgång är slut eller början på ny omgång?
    function resetKeepers() {
        for (let i = 0; i < keep_click_arr.length; i++) { 
            keep_click_arr[i] = false;
        }
    }


    //* GAME SCORE FUNCTIONS
    //=====================//

    //!  FULL HOUSE FUNCTION
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
    //! SMALL STRAIGHT FUNCTION
    function calcSmStraight(numbers_array) {
        console.log("nu testar vi straight");
        let is_sm_straight = 0;

        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        for (let i = 1; i < 6; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (arr[i] == 1) {
                is_sm_straight ++;
            }
        }
        if (is_sm_straight === 5) { 
            return 15;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }
    //! LARGE STRAIGHT FUNCTION
    function calcLgStraight(numbers_array) {
        console.log("nu testar vi Large straight");
        let is_lg_straight = 0;

        let arr = countDice(numbers_array); //// skicka vidare till countDice funktionen
        for (let i = 2; i < 7; i++) {       //// kolla om index 1 - 5 innehåller värdet 1
            if (arr[i] == 1) {
                is_lg_straight ++;
            }
        }
        if (is_lg_straight === 5) { 
            return 20;          //// om det är en liten straight, return totala summan (alltid 15)
        } else {
            return 0;
        }
    }

    function calcYatzy(numbers_array) {
        console.log("nu testar vi Yatzy");
        let arr = countDice(numbers_array);
        if (arr.includes(5)) {
            return 50;
        }

        else {
            return 0;
        }

    }

    function calcChance(numbers_array) {
        console.log("nu testar vi Chance");
        let chanceSum = 0;
        
        for (i of numbers_array) {
            chanceSum+=i;
        }

        return chanceSum;
    }

    
    
    
}); 
//* end of DOMContentLoaded                                                                                 





//! RANDOM DICE FUNCTION
//// returnar fem random tärningsvärden i array
function randomDiceArray() {
    var dice_array = new Array(5);
    for (let i = 0; i < dice_array.length; i++) {
        //// runda ner till max 5 (+1 så ingen blir noll)
        dice_array[i] = Math.floor(Math.random() * 6) + 1;  
    }
    return dice_array;
}

//! RÄKNA HUR MÅNGA TÄRNINGAR AV VARJE
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

//! LÄGGER TILL VALD TD_SCORE TILL SUMMAN
function addToSum(x){
    sum+=Number(x);
    return sum;
}