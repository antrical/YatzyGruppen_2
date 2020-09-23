document.addEventListener("DOMContentLoaded", function(e) {


    ////         =============================================       //
    ////                  imagined table structure                   //
    ////                                                             //
    ////     Player:           Maja:      Amanda:      Erika:        //
    ////     Ones:             0           0           0             //
    ////     Twos:             0           0           0             //
    ////     Threes:           0           0           0             //
    ////                                                             //
    ////         =============================================       //

    //behövs denna?
    let table = document.querySelector("table"); //or getElementById


    //// Left side title arrays for table generator functions (& score by block functions)
    let players_arr = ["Erika", "Amanda", "Deepthi", "Annika", "Maja"];
    let block1_titles = ["Ones:", "Twos:", "Threes:", "Fours:", "Fives:", "Sixes:"]
    let score_bonus_arr = ["Sum:", "Bonus:"];
    let block2_titles = [
        "Pair:", 
        "Two pairs:", 
        "Three of a kind:", 
        "Four of a kind:", 
        "Small straight:",
        "Large straight:",
        "Full house:",
        "Chance:"];
    let total_score = "Total";

    

    //// Skapar table 
    generateTableHead(players_arr);
    generateTable(players_arr, block1_titles);
    generateTableSum(players_arr, score_bonus_arr);
    generateTable(players_arr, block2_titles);
    generateTableTotal(players_arr, total_score);

    //// Testa byta innerHTML
    //// New score, row index, player
    changeScore(25, 4, 1);
    changeScore(16, 3, 1);
    changeScore(2, 0, 1);
    changeScore(30, 5, 1);
    changeScore(25, 4, 3);
    changeScore(20, 3, 3);
    changeScore(30, 5, 3);
    changeScore(8, 1, 2);
    //// Display sum (block 1)
    displaySum(1);
    displaySum(2);
    displaySum(3);
    displaySum(4);
    ////Display bonus
    for (player in players_arr) {
        displaySum(player);
    }
    
    for (player in players_arr) {
        displayBonus(player);
    }


    //! FUNCTIONS


    //* GENERATE TABLE FUNCTIONS
    //// Player names   
    function generateTableHead(players_array, class_name = "thead_header") {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode("Players:");
        cell.appendChild(text);
        row.className = class_name;
        for (let player of players_array) {
            let cell = row.insertCell();
            cell.innerHTML = player;
        }
    }
    //// Block 1  &  Block 2     
    function generateTable(players_array, block_titles) {   
        for (let i = 0; i < block_titles.length; i++) {
            let array = [];
            let row = table.insertRow();
            row.className = "tbody_style";
            let cell = row.insertCell();
            cell.className = "tbody_title";
            let text = document.createTextNode(block_titles[i]);
            cell.appendChild(text);
            for (let i = 0; i < players_array.length; i++) {
                let cell = row.insertCell();
                cell.className = "tbody_td";
                cell.innerHTML = 0;
                cell.addEventListener("click", function(event) {
                    if (this.className !== "tbody_td clicked") {
                        this.className = "tbody_td clicked";
                        /* let index = this.cellIndex;
                        sum_array[index].innerHTML = 5; */
                    }
                })
            }
        }
    }
    //// Sum & bonus    
    function generateTableSum(players_array, block_titles) {
        for (let i = 0; i < block_titles.length; i++) {
            let array = [];
            let row = table.insertRow();
            row.className = "thead sum_row"; 
            let cell = row.insertCell();
            cell.className = "thead_title";
            cell.innerHTML = block_titles[i];
            for (let j = 0; j < players_array.length; j++) {
                let cell = row.insertCell();
                cell.className = "thead_td";
                cell.innerHTML = 0;
            }
            /* if (i < 1) {
                row.className = "thead sum_row";                
            } else {
                row.className = "thead bonus_row";                
            } */
        }
    }
    //// Game total      
    function generateTableTotal(players_array, block_titles) {
        let row = table.insertRow();
        row.className = "thead";
        let cell = row.insertCell();
        cell.className = "thead_title";
        let text = document.createTextNode(block_titles);
        cell.appendChild(text);
        for (let i = 0; i < players_array.length; i++) {
            let cell = row.insertCell();
            cell.className = "thead_td";
            cell.innerHTML = 0;
        }
    }//* END OF GENERATE TABLE FUNCTIONS



    //TODO:     funktioner:                     
    //TODO: (x) plocka helt block för spelare   
    //TODO: (x) sammanställ totalt block spelare
    //TODO: (x) display total block 1 & all     
    //TODO: ( ) räkna ut bonus och display      
    //TODO: (x) change innerHTML of td          

}) 
//! CALC & DISPLAY BONUS
function displayBonus(player) {
    let bonus_td = accessTd(1, player, "sum_row");
    let sum_td = accessTd(0, player, "sum_row").innerHTML;
    if (sum_td > 63) {
        bonus_td.innerHTML = 50;
        console.log("Hello");
    }
}

//! CHANGE innerHTML SUM by PLAYER
function displaySum(player) {
    let td = accessTd(0, player, "sum_row");
    let score = getTotalBlockScore(player);
    td.innerHTML = score;
}

//! CHANGE innerHTML TOTAL by PLAYER
function displayTotal(player) {

}

//! CHANGE innerHTML for PLAYER TD
function changeScore(new_value, row, player, row_className) {
    let td = accessTd(row, player, row_className);
    td.innerHTML = new_value;
}


//! GET TOTAL BLOCK SCORE BY PLAYER
function getTotalBlockScore(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
    let scores = getTdBlockNumsByPlayer(player, block_title_arr ,row_className);
    let total = scores.reduce((acc, currVal, currIndex, arr) => {
        return acc + currVal;
    }, 0);
    return total;
}

//! GET ALL TDs NUMBERS BY BLOCK / PLAYER
function getTdBlockNumsByPlayer(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
    let arr = [];
    for (let i = 0; i < block_title_arr.length; i++) {
        let num = Number(accessTd(i, player, row_className).innerHTML);
        arr.push(num);
    }
    return arr;
}

//! GET ALL TDs BY BLOCK / PLAYER
function getTdBlockByPlayer(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
    let arr = [];
    for (let i = 0; i < block_title_arr.length; i++) {
        arr.push(accessTd(i, player, row_className));
    }
    return arr;
}

//! ACCESS SPECIFIC TD BY BLOCK, ROW & PLAYER        
//* head honcho function : called on by most others  
function accessTd(row, player, row_className = "tbody_style") {
    let rows_collection = document.getElementsByClassName(row_className);
    let rows = Array.from(rows_collection);
    return rows[row].childNodes[player];
}


