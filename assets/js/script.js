///Dice Variables
let diceType = 6;
let diceCount = 1;
let outcome = 0;
let diceSelector = document.querySelector('#diceType');
let countSelector = document.querySelector('#diceCount');
let diceBtn = document.querySelector("#diceBtn");
let diceResult = document.querySelector('#diceResult')

// Notes Variables
let notes = [];

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

// Notes Module
let saveNotes = function() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// note was clicked and editing can begin
$("#notesModule").on("click", "#description", function() {
    let text = $(this).text().trim();
    let textInput = $("<textarea>").addClass("").valueOf(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// save note when save button is clicked
$("#notesModule").on("click", "#saveBtn", function() {
    let text = $(this).parent().find("#description").val().trim();
    let title = $(this).parent().find("#title").val().trim();

    notes[title].text = text;
    saveNotes();

    let textP = $("<p>").addClass("").text(text);
    $(this).parent().find("#description").replaceWith(textP);
});

// delete button was clicked, iterate through the array and if current title exists, delete that
$("#notesModule").on("click", "#deleteBtn", function() {
    for(let i=0; i < notes.length; i++){
        if (notes[i].title === $(this).parent().find("#title").val().trim()) {
            notes.splice(i, 1);
        }
    }
});
// End Notes Module

//Roll Dice EventListener
diceBtn.addEventListener('click', rollFunction);