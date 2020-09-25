document.addEventListener("DOMContentLoaded", function(e) {
    //let header = document.getElementById("header"); //TODO: lägg till tärningar i html och gör så att de snurrar lite när ett nytt spel startar

    let main = document.getElementById("main"); ///// <main> att append:a new-game frågor children i, när man trycker på new game
    let table = document.getElementById("table"); //// Table att lägga till table element i 
    table.style.display = "none"; //// display = "" innan innehållet genereras 
    let game_ongoing = false; //// true = spel pågår(table syns) | false = spel pågår ej(table syns ej)
    let in_questioning = false; //// true = frågor visas | false = frågor visas ej 

    let current_player = 1; //// keeps track of which player will be next

    let player_names = []; //// hit skickas namnen på alla spelarna
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
  

    //// NEW GAME BUTTON CLICK EVENT 
    let new_game_button = document.getElementById("new_game_button");
    new_game_button.addEventListener("click", function(e) {
        e.preventDefault(); //// Annars laddas sidan om 

        if (game_ongoing) { //// om ett spel pågår:
            if (confirm("Are you sure you want to remove the current game?")) {
                ///// remove all table child elements and none-display table if in game
                table.style.display = "none";
                game_ongoing = false;

                while (table.firstChild) {
                    table.removeChild(table.lastChild);
                }
                main.lastChild.remove(); //// remove dice container
                
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
        in_questioning = true;
        player_names = [];
    
        ////container för allt i den här funktioner
        let main_container = document.createElement("div");
        main_container.className = "main_container"
        main.appendChild(main_container);   

        ////questions container
        let questions_container = document.createElement("div");
        questions_container.className = "questions_container";
        main_container.appendChild(questions_container);
        //// answers container
        let answers_container = document.createElement("div");
        answers_container.className = "answers_container";
        main_container.appendChild(answers_container);

        //// Button "Friends"
        let friends = document.createElement("Button");
        friends.className = "answer_button";
        friends.innerHTML = "Play with<br>friends"
        answers_container.appendChild(friends);

        //// Button "Computer"
        let computer = document.createElement("Button");
        computer.className = "answer_button";
        computer.innerHTML = "Play against<br>computer"
        answers_container.appendChild(computer);

        //* Play with friends click event 
        friends.addEventListener("click", function(e) {
            friends.remove(); //// ta bort svarsknappar 
            computer.remove();

            //// skapa fråga h3
            let question = document.createElement("h3");
            question.className = "question";
            question.innerHTML = "How many are you?"
            questions_container.appendChild(question);


            let ask_btn_arr = [];
            for (let i = 0; i < 5; i++) {   //// en knapp för varje ant 2-6 spelare
                ask_btn_arr.push(document.createElement("button"));
                Object.assign(ask_btn_arr[i], {             //TODO: förbättra med klasser sen
                    className: "num_button default_button",
                    innerHTML: i + 2,
                    marked: false, //// inte vald
                });
                answers_container.appendChild(ask_btn_arr[i]);
                
                //// click on and off number of players
                ask_btn_arr[i].addEventListener("click", function(e) {
                    if (this.marked === false) {
                        for (let button of ask_btn_arr) {
                            button.marked = false; //// reset all other buttons
                            button.className = "num_button default_button"; //TODO:  style med css tack
                            console.log("all else false");
                        }
                        this.marked = true; //// den här knappen blir marked true
                        ask_btn_arr[i].className = "num_button highlight_button";
                        console.log("made true");
                    } else {
                        this.marked = false;
                        ask_btn_arr[i].className = "num_button default_button";
                        console.log("made false");
                    }
                })
            }

            //// skapar submit button
            let submit_button = document.createElement("button");
            submit_button.className = "submit_button answer";
            submit_button.innerHTML = "Continue";
            answers_container.appendChild(submit_button);

            //* Submit button event (num of players) 
            submit_button.addEventListener("click", function(e) {
                let num_of_players = 0; 
                for (let button of ask_btn_arr) {
                    if (button.marked === true) { //// den knapp som är marked.true ger sitt innerHTML till num_of_players
                        num_of_players = button.innerHTML;
                    }
                }
                console.log(num_of_players); //? remove later

                if (num_of_players < 1) { //// om ingen knapp är vald
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
                    
                    //// <input> element där man matar in namn
                    let name_player_input = document.createElement("input");
                    name_player_input.setAttribute("type", "text");
                    name_player_input.className = "questions_input"
                    answers_container.appendChild(name_player_input);
                    name_player_input.focus();

                    //// submit name button
                    var name_button = document.createElement('button')
                    name_button.className = "submit_button answer";
                    name_button.innerHTML = "Submit";
                    answers_container.appendChild(name_button);

                    //* Submit names button event
                    name_player_input.addEventListener("keyup", function(e) {
                        if (e.code === "Enter") {
                            enterName();
                        }
                    })
                    name_button.addEventListener("click", function(e) {
                        enterName();
                    })
                    //* generates table when names are filled in
                    function enterName() {
                        name_player_input.value = name_player_input.value.trim(); //// tar bort mellanslagen om bara mellanslag i inputen
                        if (name_player_input.value.length > 0) {
                            player_names.push(name_player_input.value); //// skickar namnet till vår player-namn array 
                            player_number++;
                            name_player_input.value = "";
                            question.innerHTML = "Enter name of player " + player_number;
                            //console.log(name_player_input.value);
                            //console.log(players_arr);
                        }
                        if (player_names.length < num_of_players) {
                            name_player_input.focus();
                        } else {
                            main_container.remove();

                            table.style.display = ""; //// display "none" tas bort - visas table igen 
                            game_ongoing = true;  
                            in_questioning = false;                          
                            generateTableHead();
                            generateTable(block1_titles);
                            generateTableSum(score_bonus_arr);
                            generateTable(block2_titles);
                            generateTableTotal(total_score);
                            PlayNewGame(current_player);
                        }
                    } 
                }     
            })

        }); //* end of choose friends event

        //* Play with computer click event 
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
            var name_button = document.createElement('button');
            
            name_button.className = "submit_button answer",
            name_button.innerHTML = "Submit";
            
            answers_container.appendChild(name_button);

            //* Submit names event
            name_player_input.addEventListener("keyup", function(e) {
                if (e.code === "Enter") {
                    enterName();
                }
            })
            name_button.addEventListener("click", function(e) {
                enterName();
            })
            //* generates table
            function enterName() {
                name_player_input.value = name_player_input.value.trim();
                if (name_player_input.value.length > 0) {
                    player_names.push(name_player_input.value);
                    player_names.push("Computer");
                    console.log(name_player_input.value);
                    question.innerHTML = "Enter you name";

                    main_container.remove();

                    game_ongoing = true;  
                    in_questioning = false;  
                    table.style.display = ""; //// display "none" tas bort - visas table igen 
                    
                    //// skapar innehåll i table utifrån arrayer
                    generateTableHead();
                    generateTable(block1_titles);
                    generateTableSum(score_bonus_arr);
                    generateTable(block2_titles);
                    generateTableTotal(total_score);
                    
                } else {
                    name_player_input.value= "";
                    name_player_input.focus();
                }
                PlayNewGame(current_player);

            }
        });

    }
    //! PLAY GAME FUNCTION  
    function PlayNewGame(current_player) { //! new parameter
        game_ongoing = true;  
        let throws_left = 3; //// Ant slag kvar i början av en runda
        let dice_container = document.createElement("div"); //// div att placera tärningar och knapp i
        dice_container.className = "dice_container";
        main.appendChild(dice_container);
        
        //// sökvägar till tärningsbilder
        var dice_png_arr = [];   // ["dice/.png" x 7]
        for (let i = 0; i < 7; i++) {
            dice_png_arr[i] = "resources/images/dice/dice-" + i + ".png";
        }
        
        //// tärningarna som visas i browsern
        let img_array = [];
        ////skapar fem img-element som skickas in i array ovan
        for (let i = 0; i < 5; i++) {
            let img = document.createElement("img");
            img.className = "dice_img unsaved";
            img.src = "resources/images/dice/dice-0.png"; 
            img.saved = false; //// ej klickad för att spara 
            dice_container.appendChild(img);
            //// toggle save dice event
            img.addEventListener("click", function(e) {
                if (this.saved === false) {
                    this.saved = true; //// är den inte klickad så blir this.saved = true
                    img.className = "dice_img saved"; 
                } else {
                    this.saved = false; //// är den klickad så blir this.saved = false
                    img.className = "dice_img unsaved";
                }
            });
            img_array.push(img);
        }

        
        //// skapar och ger egenskaper till roll dice button 
        let roll_dice_button = document.createElement("button");
        roll_dice_button.className = "roll_dice_button";
        roll_dice_button.innerHTML = "ROLL<br>DICE";
        dice_container.appendChild(roll_dice_button);
        
        let dice_arr; //// Kommer innehålla kastet med fem tärningsobjekt
        
        roll_dice_button.addEventListener("click", function(e) {
            if (throws_left > 0) {
                //// kommer innehålla 5 index med value 0 om man INTE vill spara eller värdet på tärningen man VILL spara. 
                let keep_dice_arr = [];
                for (let i = 0; i < 5; i++) {
                    if (img_array[i].saved === true) {
                        keep_dice_arr.push(dice_arr[i].value);
                    } else {
                        keep_dice_arr.push(0);
                    }
                }                         
                let new_throw = new FiveDice(current_player, keep_dice_arr); //// Skapar ett objekt som innehåller 5 tärningar. Parameter exempel:
                                                              //// [0, 2, 0, 6, 1] - value 0 = slå om, value > 0 = behåll
                dice_arr = new_throw.dice_obj_arr;            //// Kommer innehålla kastet med fem tärningsobjekt som genereras från DiceArray (Papa Dice)
                for (let i = 0; i < 5; i++) {
                    img_array[i].src = "resources/images/dice/dice-" + dice_arr[i].value + ".png" //// img_array innehåller tärningsbilderna som visas just nu.
                                                                                                  //// För att ge rätt bild så grågar vi dice arr vilket värde den har
                                                                                                  //// och ger den rätt sökväg.
                }
                throws_left--;
                
            } else {
                alert("no throws left. choose a score.");
            }
        })
        
        
    }

    //TODO: lägg gameplayet i en class - då kan man anropa gameplay img och resetta spelet från td click 

    //! FUNCTIONS


    //* GENERATE TABLE FUNCTIONS
    //// Player names   
    function generateTableHead(class_name = "thead_header") {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode("Players:");
        cell.appendChild(text);
        row.className = class_name;
        for (let player of player_names) {
            let cell = row.insertCell();
            cell.innerHTML = player;
        }
    }
    //// Block 1  &  Block 2    
    function generateTable(block_titles) {   
        for (let i = 0; i < block_titles.length; i++) {
            let row = table.insertRow();
            row.className = "tbody_row";
            let cell = row.insertCell();
            cell.className = "tbody_title";
            let text = document.createTextNode(block_titles[i]);
            cell.appendChild(text);
            for (let i = 0; i < player_names.length; i++) {
                let cell = row.insertCell();
                cell.className = "tbody_td";
                cell.innerHTML = 0;
                cell.clicked = false;
                cell.addEventListener("click", function(event) {
                    if (this === this.parentNode.childNodes[current_player]) {  //// NEW, checks if "this" is in the right column, same as current player
                        if (this.clicked == false) {
                            this.clicked = true;
                            this.className = "tbody_td clicked";
                            
                            for (let i = 0; i < 15; i++) {  //// NEW clear all un-clicked scores from current player
                                changeScore(0, i, current_player);      //// (15 clickable rows to check)
                            }

                            displaySumAndBonus(current_player);
                            displayTotal(current_player);
                            /* let set_totals = checkIfTotal(player_names);
                            if (set_totals) {
                                let winner = getWinner(player_names);
                                if (confirm("Congratulations, " + winner + "! Play another game?")) {
                                    table.style.display = "none";
                                    game_ongoing = false;

                                    while (table.firstChild) {
                                        table.removeChild(table.lastChild);
                                    }
                                    main.lastChild.remove(); //? funkar inte än
                                    newGameQuestions(); 
                                }
                            } */
                            
                            ////updates current player to send which player will play next round to PlayNewGame function
                            if (current_player < player_names.length) {
                                current_player++;
                            } else if (current_player = player_names.length) {
                                current_player = 1;
                            }
    
                            main.lastChild.remove(); //// new, remove dice_container (last child of main)
                            PlayNewGame(current_player);
                            
                            
                        }
                    }
                })
            }
        }
    }
    //// Sum & bonus    
    function generateTableSum(block_titles) {
        for (let i = 0; i < block_titles.length; i++) {
            let row = table.insertRow();
            row.className = "thead sum_row"; 
            let cell = row.insertCell();
            cell.className = "thead_title";
            cell.innerHTML = block_titles[i];
            for (let j = 0; j < player_names.length; j++) {
                let cell = row.insertCell();
                cell.className = "thead_td";
                cell.innerHTML = 0;
            }
        }
    }
    //// Game total      
    function generateTableTotal(block_titles) {
        let row = table.insertRow();
        row.className = "thead total_row";
        let cell = row.insertCell();
        cell.className = "thead_title";
        let text = document.createTextNode(block_titles);
        cell.appendChild(text);
        for (let i = 0; i < player_names.length; i++) {
            let cell = row.insertCell();
            cell.className = "thead_td";
            cell.innerHTML = 0;
        }
    }//* END OF GENERATE TABLE FUNCTIONS
    
    
    
}) //* End of DOM event


//! CHANGE innerHTML for PLAYER table data / cell
function changeScore(new_value, row, player, row_className = "tbody_row") {
    let td = accessTd(row, player, row_className);
    if (td.clicked === false) {     // Om poängen är sparad av spelaren sen tidigare, byts inte värdet.
        td.innerHTML = new_value;
    }
}

//! CHANGE innerHTML SUM and BONUS by PLAYER
function displaySumAndBonus(player) {
    if(checkAllChosen(1, player)) {
        let sum_td = accessTd(0, player, "sum_row");
        let bonus_td = accessTd(1, player, "sum_row");
        let score = getTotalBlockScore(player, 1);
        sum_td.innerHTML = score;
        if (sum_td.innerHTML >= 63) {
            bonus_td.innerHTML = 50;
        }
    }
}

//! CHANGE innerHTML TOTAL by PLAYER if all td:s are chosen
function displayTotal(player) {
    let all_chosen = checkAllChosen(2, player);
    if (all_chosen) {
        let sum_td = Number(accessTd(0, player, "sum_row").innerHTML);
        let bonus_td = Number(accessTd(1, player, "sum_row").innerHTML);
        let block2total = getTotalBlockScore(player, 2);
        let total_td = accessTd(0, player, "total_row");
        total_td.innerHTML = sum_td + bonus_td + block2total;
    }
}

//! CHECK if ALL BLOCK 1 or ALL td:s ARE CHOSEN
function checkAllChosen(block, player) {
    let all_chosen = true;
    if (block === 1) {
        for (let i = 0; i < 6; i++) {
            let td = accessTd(i, player);
            if (td.clicked === false) {
                all_chosen = false;
            }
        }
    } else {
        for (let i = 0; i < 15; i++) {
            let td = accessTd(i, player);
            if (td.clicked === false) {
                all_chosen = false;
            }
        }
    }
    return all_chosen;
}


//! GET TOTAL BLOCK SCORE BY PLAYER
function getTotalBlockScore(player, block = 1, row_className = "tbody_row") {
    let scores = getTdBlockNumsByPlayer(player, block ,row_className);
    let total = scores.reduce((acc, currVal, currIndex, arr) => {
        return acc + currVal;
    }, 0);
    return total;
}

//! GET ALL TDs NUMBERS BY BLOCK / PLAYER
function getTdBlockNumsByPlayer(player, block = 1, row_className = "tbody_row") {
    let arr = [];
    if(block === 1) {
        for (let i = 0; i < 6; i++) {
            let num = Number(accessTd(i, player, row_className).innerHTML);
            arr.push(num);
        }
    } else {
        for (let i = 6; i < 9; i++) {
            let num = Number(accessTd(i, player, row_className).innerHTML);
            arr.push(num);
        }
    }
    return arr;
}


//! CHECK IF TOTAL IS SET
function checkIfTotal(players_arr) {
    let are_all_set = true;
    for (player in players_arr) {
        let total_td = accessTd(0, player, "total_row");
        if (Number(total_td.innerHTML) == 0) {
            are_all_set = false;
        }
    } ////nåt är fel
    return are_all_set;
}

//! CHECK who's the WINNER
function getWinner(players_arr) {
    let totals_row = Array.from(document.getElementsByClassName("total_row"));
    let largest_num = 0;
    let current_num = 0;

    for (player in players_arr) {
        let total_td_num = totals_row.childNodes[player].innerHTML;
        current_num = total_td_num;
        largest_num = Math.max(largest_num, current_num);
    }
    let winner = players_arr[totals_row.indexOf(largest_num)];

    return winner; //// funkar inte än
}



//! ACCESS SPECIFIC TD BY BLOCK, ROW & PLAYER        
//* head honcho function : called on by most others  
function accessTd(row, player, row_className = "tbody_row") {
    let rows_collection = document.getElementsByClassName(row_className);
    let rows = Array.from(rows_collection);
    return rows[row].childNodes[player];
}