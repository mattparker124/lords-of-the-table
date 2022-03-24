///Dice Variables
let diceType = 6;
let diceCount = 1;
let outcome = 0;
let diceSelector = document.querySelector('#diceType');
let countSelector = document.querySelector('#diceCount');
let diceBtn = document.querySelector("#diceBtn");
let diceResult = document.querySelector('#diceResult')

let faceUrl = ""
let generatorString = "00000"
let characters = "1234567890abcdefghijklmnopqrstuvwxyz";

///Function to define the dice roll
let rollFunction = function(){
    diceType = diceSelector.value
    diceCount = countSelector.value
    
    if (diceCount == 1){
        outcome = d(diceType);
    } else {
        outcome = XdY(diceCount,diceType);
    }
    console.log(outcome);
    diceResult.textContent = outcome
}

let selectDice = function(){
    console.log(this)
}

///Dice Module
//x=number of dice
//y=number of sides

//function that rolls one die
function d(y) {
    return Math.floor(Math.random() * y) + 1;
}

//function that rolls multiple dice
function XdY(x,y) {
    let results = [];
//do while loop that runs the d(y) function X number of times
    do {
        results.push(d(y));
    } while(results.length < x)
    
    return results;
}
///End Dice Module


///Face Generator Api
let generateFace = function(){
    let result = ""
    let poolLength = characters.length;
    for (let i = 0; i < 7; i++){
        result += characters.charAt(Math.random()*poolLength);
    }
    generatorString = result;
    faceUrl = "https://robohash.org/"+generatorString+".png?set=set5"
    console.log(faceUrl);
}


//Roll Dice EventListener
diceBtn.addEventListener('click', rollFunction);