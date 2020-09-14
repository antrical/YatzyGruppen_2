let sum = 0;
let diceValue = 0;         ////Erika: la till diceValue för att kunna räkna ut summan på rad 34
for (x of p1_sum_array) {
    diceValue++
    console.log(diceValue);
    let y = parseInt(x);

    if (isNaN(x)) {        ////Erika: Bytte ut vår "kolla om det är nummer" kod till denna. Den gamla slutatde funka
        y = 0;
    }

    sum += (y*diceValue);   ////Erika: räknar ut poängen utifrån hur många det finna av varje tärning
     
} 