class Table {
    constructor(players_arr) {
        let table = document.createElement("table");
        main.appendChild(table);

        this.block1_titles = ["Ones:", "Twos:", "Threes:", "Fours:", "Fives:", "Sixes:"]
        this.score_bonus_arr = ["Sum:", "Bonus:"];
        this.block2_titles = [
            "Pair:", 
            "Two pairs:", 
            "Three of a kind:", 
            "Four of a kind:", 
            "Small straight:",
            "Large straight:",
            "Full house:",
            "Chance:",
            "Yatzy:"];
        this.total_score = "Total";
        this.generateTableHead(players_arr);
        this.generateTable(players_arr, block1_titles);
        this.generateTableSum(players_arr, score_bonus_arr);
        this.generateTable(players_arr, block2_titles);
        this.generateTableTotal(players_arr, total_score);
    }

    //// Player names   
    generateTableHead(players_array, class_name = "thead_header") {
        let row = this.table.insertRow();
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
    generateTable(players_array, block_titles) {   
        for (let i = 0; i < block_titles.length; i++) {
            let row = this.table.insertRow();
            row.className = "tbody_style";
            let cell = row.insertCell();
            cell.className = "tbody_title";
            let text = document.createTextNode(block_titles[i]);
            cell.appendChild(text);
            for (let i = 0; i < players_array.length; i++) {
                let cell = row.insertCell();
                cell.className = "tbody_td";
                cell.innerHTML = 0;
                cell.clicked = false;
                cell.addEventListener("click", function(event) {
                    if (event.target.className !== "tbody_td clicked") {
                        event.target.className = "tbody_td clicked";
                        event.target.clicked = true;
                        saved = true;
                        throws_left = 3;
                        saved = false;
                        for (let img of img_array) {
                            img.className = "dice_img unsaved";
                            img.saved = false;
    
                        }
                        
                        
                    }
                })
            }
        }
    }
    //// Sum & bonus    
    generateTableSum(players_array, block_titles) {
        for (let i = 0; i < block_titles.length; i++) {
            let row = this.table.insertRow();
            row.className = "thead sum_row"; 
            let cell = row.insertCell();
            cell.className = "thead_title";
            cell.innerHTML = block_titles[i];
            for (let j = 0; j < players_array.length; j++) {
                let cell = row.insertCell();
                cell.className = "thead_td";
                cell.innerHTML = 0;
            }
        }
    }
    //// Game total      
    generateTableTotal(players_array, block_titles) {
        let row = this.table.insertRow();
        row.className = "thead total_row";
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

    //! CALC & DISPLAY BONUS
    displayBonus(player) {
        let bonus_td = this.accessTd(1, player, "sum_row");
        let sum_td = this.accessTd(0, player, "sum_row").innerHTML;
        if (sum_td > 63) {
            bonus_td.innerHTML = 50;
        }
    }

    //! CHANGE innerHTML SUM by PLAYER
    displaySum(player) {
        let td = this.accessTd(0, player, "sum_row");
        let score = this.getTotalBlockScore(player);
        td.innerHTML = score;
    }

    //! CHANGE innerHTML TOTAL by PLAYER
    displayTotal(new_value, player) {
        let td = this.accessTd(0, player, "total_row");
        td.innerHTML = new_value;
    }

    //! CHANGE innerHTML for PLAYER TD
    changeScore(new_value, row, player, row_className = "tbody_style") {
        let td = this.accessTd(row, player, row_className);
        if (td.clicked === false) {
            td.innerHTML = new_value;
        }
    }

    //! GET TOTAL BLOCK SCORE BY PLAYER
    getTotalBlockScore(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
        let scores = this.getTdBlockNumsByPlayer(player, block_title_arr ,row_className);
        let total = scores.reduce((acc, currVal, currIndex, arr) => {
            return acc + currVal;
        }, 0);
        return total;
    }

    //! GET ALL TDs NUMBERS BY BLOCK / PLAYER
    getTdBlockNumsByPlayer(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
        let arr = [];
        for (let i = 0; i < block_title_arr.length; i++) {
            let num = Number(this.accessTd(i, player, row_className).innerHTML);
            arr.push(num);
        }
        return arr;
    }

    //! GET ALL TDs BY BLOCK / PLAYER
    getTdBlockByPlayer(player, block_title_arr = "block1_titles", row_className = "tbody_style") {
        let arr = [];
        for (let i = 0; i < block_title_arr.length; i++) {
            arr.push(this.accessTd(i, player, row_className));
        }
        return arr;
    }

    //! CHECK IF TOTAL IS SET
    /* function checkIfTotal() {

    } */

    //! ACCESS SPECIFIC TD BY BLOCK, ROW & PLAYER        
    //* head honcho function : called on by most others  
    accessTd(row, player, row_className = "tbody_style") {
        let rows_collection = document.getElementsByClassName(row_className);
        let rows = Array.from(rows_collection);
        return rows[row].childNodes[player];
    }
}