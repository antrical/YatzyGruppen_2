document.addEventListener("DOMContentLoaded", function(e) {
    let header = document.getElementById("header"); //TODO: lägg till tärningar i html och gör så att de snurrar lite när ett nytt spel startar
    let main = document.getElementById("main"); ///// div att fästa new game frågor children i
    let table = document.getElementById("table"); //// Table att lägga till children i
    table.style.display = "none"; //// display = "" innan innehållet genereras
    let game_ongoing = false;
    let in_questioning = false;

    let players_arr = [];
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
        "Chance:",
        "Yatzy:"];
        let total_score = "Total";
        let throws_left = 3;
        let saved = false;

    



    //* GAME    
    // while () //// while total array tds inte ifyllda





    //// NEW GAME HEADER CLICK EVENT
    let new_game_button = document.getElementById("new_game_button");
    new_game_button.addEventListener("click", function(e) {
        e.preventDefault();
        if (game_ongoing) {
            if (confirm("Are you sure you want to remove the current game? ")) {
                ///// remove all table child elements and none-display table if in game
                table.style.display = "none";
                while (table.firstChild) {
                    table.removeChild(table.lastChild);
                }
                /* while (main.firstChild) {
                    main.removeChild(main.lastChild);
                } */ //TODO: fixa detta
                
                newGameQuestions();   
            }
        } else if (in_questioning) {
            ///// remove all question elements if in questioning
            while (main.firstChild) {
                main.removeChild(main.lastChild);
            }
            newGameQuestions();
        } else {
            newGameQuestions();
        }
    });
    


    //! NEW GAME QUESTIONS
    function newGameQuestions() {
        //TODO: eventlistener remove this if other links are clicked
        players_arr = [];
        in_questioning = true;
        game_ongoing = false;
    
        ////container div
        let main_container = document.createElement("div");
        main_container.className = "main_container"
        main.appendChild(main_container);   
        ////questions
        let questions_container = document.createElement("div");
        questions_container.className = "questions_container";
        main_container.appendChild(questions_container);
        //// answers
        let answers_container = document.createElement("div");
        answers_container.className = "answers_container";
        main_container.appendChild(answers_container);

        //* Play with friends click event 
        let friends = document.createElement("Button");
        friends.className = "answer_button";
        friends.innerHTML = "Play with<br>friends"
        answers_container.appendChild(friends);
        friends.addEventListener("click", function(e) {
            friends.remove();
            computer.remove();
            let question = document.createElement("h3");
            question.className = "question";
            question.innerHTML = "How many are you?"
            questions_container.appendChild(question);
            let ask_btn_arr = [];

            for (let i = 0; i < 5; i++) {
                ask_btn_arr.push(document.createElement("button"));
                Object.assign(ask_btn_arr[i], {
                    className: "num_button default_button",
                    innerHTML: i + 2,
                    marked: false,
                });
                answers_container.appendChild(ask_btn_arr[i]);
                //// click on and off number of players
                ask_btn_arr[i].addEventListener("click", function(e) {
                    if (this.marked === false) {
                        for (let button of ask_btn_arr) {
                            button.marked = false; //// reset all other buttons
                            button.className = "num_button default_button";
                            console.log("all else false");
                        }
                        this.marked = true;
                        ask_btn_arr[i].className = "num_button highlight_button";
                        console.log("made true");
                    } else {
                        this.marked = false;
                        ask_btn_arr[i].className = "num_button default_button";
                        console.log("made false");
                    }
                })
            }
            let submit_button = document.createElement("button");
            submit_button.className = "submit_button answer";
            submit_button.innerHTML = "Continue";
            answers_container.appendChild(submit_button);

            //* Submit num of players event
            submit_button.addEventListener("click", function(e) {
                let num_of_players = 0;
                for (let button of ask_btn_arr) {
                    if (button.marked === true) {
                        num_of_players = button.innerHTML;
                    }
                }
                console.log(num_of_players); //? remove later

                if (num_of_players < 1) {
                    alert("Please choose number of players");
                } else {
                    ////player number counter
                    let player_number = 1;
                    question.innerHTML = "Enter name of player " + player_number;

                    ////remove previpus buttons
                    for (let button of ask_btn_arr) { 
                        button.remove();
                    }
                    submit_button.remove();

                    
                    //// <input> tag
                    let name_player_input = document.createElement("input");
                    name_player_input.setAttribute("type", "text");
                    name_player_input.className = "questions_input"
                    answers_container.appendChild(name_player_input);
                    name_player_input.focus();

                    //// submit name button
                    var nameButton = document.createElement('button')
                    Object.assign(nameButton, {
                    className: 'submit_button answer',
                    innerHTML: "Submit"
                    });
                    answers_container.appendChild(nameButton);

                    //* Submit names event
                    name_player_input.addEventListener("keyup", function(e) {
                        if (e.code === "Enter") {
                            enterName();
                        }
                    })
                    nameButton.addEventListener("click", function(e) {
                        enterName();
                    })
                    //* generates table
                    function enterName() {
                        name_player_input.value = name_player_input.value.trim();
                        if (name_player_input.value.length > 0) {
                            players_arr.push(name_player_input.value);
                            console.log(name_player_input.value);
                            player_number++;
                            question.innerHTML = "Enter name of player " + player_number;
                            console.log(players_arr);
                        }
                        if (players_arr.length < Number(num_of_players)) {
                            name_player_input.value= "";
                            name_player_input.focus();
                        } else {
                            main_container.remove();

                            table.style.display = "";
                            game_ongoing = true;  
                            in_questioning = false;                          
                            generateTableHead(players_arr);
                            generateTable(players_arr, block1_titles);
                            generateTableSum(players_arr, score_bonus_arr);
                            generateTable(players_arr, block2_titles);
                            generateTableTotal(players_arr, total_score);
                            PlayNewGame();
                        }
                    } 
                }   
             
            })


        }); //* end of choose friends event

        //* Play with computer click event 
        let computer = document.createElement("Button");
        computer.className = "answer_button";
        computer.innerHTML = "Play against<br>computer"
        answers_container.appendChild(computer);
        computer.addEventListener("click", function(e) {
            friends.remove();
            computer.remove();
            console.log("Play against computer...")
            let question = document.createElement("h3");
            question.className = "question";
            question.innerHTML = "How many are you?"
            questions_container.appendChild(question);
            question.innerHTML = "Enter your name";


            
            //// <input> tag
            let name_player_input = document.createElement("input");
            name_player_input.setAttribute("type", "text");
            name_player_input.className = "questions_input"
            answers_container.appendChild(name_player_input);
            name_player_input.focus();

            //// submit name button
            var nameButton = document.createElement('button')
            Object.assign(nameButton, {
            className: 'submit_button answer',
            innerHTML: "Submit"
            });
            answers_container.appendChild(nameButton);

            //* Submit names event
            name_player_input.addEventListener("keyup", function(e) {
                if (e.code === "Enter") {
                    enterName();
                }
            })
            nameButton.addEventListener("click", function(e) {
                enterName();
            })
            //* generates table
            function enterName() {
                name_player_input.value = name_player_input.value.trim();
                if (name_player_input.value.length > 0) {
                    players_arr.push(name_player_input.value);
                    players_arr.push("Computer");
                    console.log(name_player_input.value);
                    question.innerHTML = "Enter you name";
                    console.log(players_arr);

                    main_container.remove();

                    table.style.display = "";
                    game_ongoing = true;  
                    in_questioning = false;                          
                    generateTableHead(players_arr);
                    generateTable(players_arr, block1_titles);
                    generateTableSum(players_arr, score_bonus_arr);
                    generateTable(players_arr, block2_titles);
                    generateTableTotal(players_arr, total_score);
                    
                } else {
                    name_player_input.value= "";
                    name_player_input.focus();
                }
                PlayNewGame();

            }
        });

    }
    //! PLAY GAME FUNCTION  
    function PlayNewGame() {

        
        let dice_container = document.createElement("div");
        dice_container.className = "dice_container";
        main.appendChild(dice_container);

        //// Class for array of (five) dice objects
        class DiceArray {
            constructor(keep_dice_arr = []) {
                this.new_dice_obj_arr = [];

                this.keep_dice_arr = keep_dice_arr;

                if (keep_dice_arr.length > 1) {
                    for (let i = 0; i < 5; i++) {
                        this.new_dice_obj_arr[i] = new Dice(keep_dice_arr[i]);
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        this.new_dice_obj_arr[i] = new Dice();
                    }
                }
                
        
                this.dice_values = []; // [0, 0, 0, 0, 0, 0, 0]
                for (let i = 0; i <= 6; i++) {
                    this.dice_values[i] = 0;
                }
                this.calcNumEachVal();
                
                this.dice_arr = []; // [ x, x, x, x, x ]
                for (let dice of this.new_dice_obj_arr) {
                    this.dice_arr.push(dice.value);
                }
        

                for (let i = 0; i < 6; i++) {
                    let new_value = this.calcBlockOnePossibles(i + 1);
                    changeScore(new_value, i, 1);
                }
                changeScore(this.calcPair(), 6, 1); //// new value, table index, player
                changeScore(this.calcTwoPairs(), 7, 1);
                changeScore(this.calcThreeOfAKind(), 8, 1);
                changeScore(this.calcFourOfAKind(), 9, 1);
                changeScore(this.calcSmStraight(), 10, 1);
                changeScore(this.calcLgStraight(), 11, 1);
                changeScore(this.calcFullHouse(), 12, 1);
                changeScore(this.calcChance(), 13, 1);
                changeScore(this.calcYatzy(), 14, 1);

            }
            //// puts +1 in each box corresponding to dice numbers
            calcNumEachVal() {  
                this.new_dice_obj_arr.map(curr_val => {
                    this.dice_values[curr_val.value]++;
                })
            }
            //* BLOCK 1 POSSIBLE SCORES
            calcBlockOnePossibles(dice) {

                if (this.dice_arr.includes(dice)) {
                    let filtered = this.dice_arr.filter((num) => {
                        return num === dice;
                    })
                    
                    let sum = filtered.reduce((accumulator, currentval) => accumulator + currentval);
                    return sum;

                } else {
                    return 0;
                }
            } 
            //* PAIR
            calcPair() {
                let pair = 0;

                for (let i = 0; i < this.dice_values.length; i++) {
                    if (this.dice_values[i] > 1) {
                        if (pair < (i * 2)) {
                            pair = (i * 2);
                        }
                    }
                }
                return pair;

            }
            //* TWO PAIRS
            calcTwoPairs() {
                let pairs = 0;
                let paircounter = 0;

                for (let i = 0; i < this.dice_values.length; i++) {
                    if (this.dice_values[i] === 2 || this.dice_values[i] === 3) {
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
                    if (this.dice_values[i] === 3) {
                        threes = i * 3;
                    }
                }
                return threes;
            }
            //* FOUR OF A KIND
            calcFourOfAKind() {  
                let fours = 0;
        
                for (let i = 0; i < this.dice_values.length; i++) {
                    if (this.dice_values[i] === 4) {
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
        //// class for dice object 
        class Dice {
            constructor(keep) {
                
                this.value = this.roll(keep);
                
                
            }
            roll(keep) {
                if (keep > 0) {
                    return keep;
                } else {
                    return Math.floor(Math.random() * 6) + 1;
                } 
            }
        }
        
        //// sökvägar till tärningsbilder
        var dice_png_arr = [];   // ["dice/.png" x 7]
        for (let i = 0; i < 7; i++) {
            dice_png_arr[i] = "resources/images/dice/dice-" + i + ".png";
        }
        //// class för fem img objekt
        /* class DiceIcons {
            constructor() {
                this.img = document.createElement("img");
                this.img.className = "dice_img unsaved";
                this.img.src = "resources/images/dice/dice-0.png" //// gör loop
                this.img.saved = false;
                this.dice_container.appendChild(img);
                //// toggle save dice event
                this.img.addEventListener("click", function(e) {
                    if (this.saved === false) {
                        console.log("saved");
                        img.className = "dice_img saved";
                        this.saved = true;
                        console.log(this.saved);
                    } else {
                        this.saved = false;
                        console.log("unsaved");
                        img.className = "dice_img unsaved";
                        console.log(this.saved);
                    }
            });
            }
        } */

        let img_array = [];
        for (let i = 0; i < 5; i++) {
            let img = document.createElement("img");
            img.className = "dice_img unsaved";
            img.src = "resources/images/dice/dice-0.png" //// gör loop
            img.saved = false;
            dice_container.appendChild(img);
            //// toggle save dice event
            img.addEventListener("click", function(e) {
                if (this.saved === false) {
                    console.log("saved");
                    img.className = "dice_img saved";
                    this.saved = true;
                    console.log(this.saved);
                } else {
                    this.saved = false;
                    console.log("unsaved");
                    img.className = "dice_img unsaved";
                    console.log(this.saved);
                }
            });
            img_array.push(img);
        }
        let dice_arr = [];
        //// roll dice button 
        let roll_dice_button = document.createElement("button");
        roll_dice_button.className = "roll_dice_button";
        roll_dice_button.innerHTML = "ROLL<br>DICE";
        dice_container.appendChild(roll_dice_button);

        roll_dice_button.addEventListener("click", function(e) {
            if (throws_left > 0) {
                let keep_dice_arr = [];
                for (let i = 0; i < 5; i++) {
                    if (img_array[i].saved === true) {
                        keep_dice_arr.push(dice_arr[i].value);
                    } else {
                        keep_dice_arr.push(0);
                    }
                } 
                console.log(keep_dice_arr);//? test, ta bort
                let new_throw = new DiceArray(keep_dice_arr);
                dice_arr = new_throw.new_dice_obj_arr;
                assignImgSrc(dice_arr);
                console.log(dice_arr);//? test, ta bort
                /* if (saved === true) {
                    throws_left = 3;
                    saved = false;
                    for (let img of img_array) {
                        img.className = "dice_img unsaved";
                        img.saved = false;

                    }
                } */
                throws_left--;
                
            } else {
                alert("no throws left. choose a score.");
            }
        })
        function assignImgSrc(dice_arr) {
            for (let i = 0; i < 5; i++) {
                img_array[i].src = "resources/images/dice/dice-" + dice_arr[i].value + ".png"
            }
        }
        
    }

    //TODO: lägg gameplayet i en class - då kan man anropa gameplay img och resetta spelet från td click

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
                cell.clicked = false;
                cell.addEventListener("click", function(event) {
                    if (this.className !== "tbody_td clicked") {
                        this.className = "tbody_td clicked";
                        this.clicked = true;
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
    function generateTableSum(players_array, block_titles) {
        for (let i = 0; i < block_titles.length; i++) {
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
        }
    }
    //// Game total      
    function generateTableTotal(players_array, block_titles) {
        let row = table.insertRow();
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

    

}) //* End of DOM event

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
function displayTotal(new_value, player) {
    let td = accessTd(0, player, "total_row");
    td.innerHTML = new_value;
}

//! CHANGE innerHTML for PLAYER TD
function changeScore(new_value, row, player, row_className = "tbody_style") {
    let td = accessTd(row, player, row_className);
    if (td.clicked === false) {
        td.innerHTML = new_value;
    }
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

//! CHECK IF TOTAL IS SET
/* function checkIfTotal() {

} */

//! ACCESS SPECIFIC TD BY BLOCK, ROW & PLAYER        
//* head honcho function : called on by most others  
function accessTd(row, player, row_className = "tbody_style") {
    let rows_collection = document.getElementsByClassName(row_className);
    let rows = Array.from(rows_collection);
    return rows[row].childNodes[player];
}