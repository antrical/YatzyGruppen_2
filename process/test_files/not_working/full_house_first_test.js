let dice1=5;
let dice2=5;
let dice3=6;
let dice4=6;
let dice5=6;
​
let dice_array= [dice1, dice2, dice3, dice4, dice5];
​
let count1=0;
let count2=0;
let number1=0;
​
let full_house=0;

for (let i=0; i<dice_array.length; i++){
    console.log("koll i " + i);
    for(let j=i+1; j<dice_array.length; j++){
        console.log("koll j " + j);
        if (dice_array[i]===dice_array[j]) {
            for(let k=j+1; k<dice_array.length; k++){
            }
        }
        for(let k=j+1; k<dice_array.length; k++){
        }
        if(dice_array[i]===dice_array[j] && count1<3){
            count1++;
            
            number1=dice_array[i];
            console.log("count1++");
        }
        
​
        
        else if(dice_array[i]===dice_array[j] && count2<3){
            count2++;
            number1=dice_array[i];
            console.log("count++");
        }
    }
}
console.log(two_dice);
console.log(three_dice);