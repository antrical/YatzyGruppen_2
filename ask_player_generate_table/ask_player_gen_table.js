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
        "Chance:"];
    let total_score = "Total";

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
            }
        });
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
function displayTotal(player) {
    //TODO: lägg till funktion
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