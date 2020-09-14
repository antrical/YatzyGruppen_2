document.addEventListener("DOMContentLoaded", function(e) {
    let roll_dice = document.getElementById("roll_dice");
    let dice_shown_img_arr = new Array(5);  //// 5 träningar som syns
    dice_shown_img_arr[0] = document.getElementById("dice_cell_1"); 
    dice_shown_img_arr[1] = document.getElementById("dice_cell_2");
    dice_shown_img_arr[2] = document.getElementById("dice_cell_3");
    dice_shown_img_arr[3] = document.getElementById("dice_cell_4");
    dice_shown_img_arr[4] = document.getElementById("dice_cell_5");

    var dice_values_array = new Array(5);   //// värden på tärningarna sparas här
    var dice_keep = new Array(5);           //// bool toggle array vilka man vill spara (true)
    var throws_left = 3;

    //// tärningsbilder sparas i array
    var dice_png_array = new Array(7);
    dice_png_array[0] = "images/dice/dice-zero.png";
    dice_png_array[1] = "images/dice/dice-one.png"; 
    dice_png_array[2] = "images/dice/dice-two.png";
    dice_png_array[3] = "images/dice/dice-three.png";
    dice_png_array[4] = "images/dice/dice-four.png";
    dice_png_array[5] = "images/dice/dice-five.png";
    dice_png_array[6] = "images/dice/dice-six.png";
    
    //// sätter alla tärningarna till 0
    for (let i = 0; i < dice_values_array.length; i++) {
        dice_values_array[i] = 0;
    }
    //// lägger in false i hel array (inte valt att spara), en för varje tärning
    for (let i = 0; i < dice_keep.length; i++) { 
        dice_keep[i] = false;
    }
    
    //dice_keep[3] = true; //// manuellt toggle test på 4:e tärningen

    
    roll_dice.addEventListener("click", function(event) {
        let random_throw = randomDiceArray();
        //// & om man har inte slagit tre gånger redan
        if (throws_left > 0) {
            for (let i = 0; i < 5; i++) {
                //console.log(random_throw[i]); // Tärningarna som slumpades fram

                    ////om tärning index [i] inte ska sparas:
                if (!dice_keep[i]) {
                    dice_shown_img_arr[i].src = dice_png_array[random_throw[i]];  //// byter bild motsvarande randomized tärningskast-array
                    dice_values_array[i] = random_throw[i];
                }   
            } 
            throws_left--;
        }
        console.log("Nya tärningskastet med sparade tärningar: " + dice_values_array);
    });
});



//// returnar fem random tärningsvärden i array
function randomDiceArray() {
    var dice_array = new Array();
    for (let i = 0; i < dice_array.length; i++) {
        //// runda ner till max 5 (+1 så ingen blir noll)
        dice_array[i] = Math.floor(Math.random() * 6) + 1;  
    }
    return dice_array;
}
