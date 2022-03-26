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
let savedNotesList = document.querySelector("#notes");

// faceGen Variables
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

// Notes Module
let changeNote = function(noteTitle) {
    let text = document.getElementById('description');
    let title = document.getElementById('title');
}

let loadNotes = function() {
    notes = JSON.parse(localStorage.getItem("notes"));

    // if nothing is in localStorage, create a new array to track
    if (!notes) {
        notes = [];
    }

    populateDropdown();
}

let saveNotes = function() {
    localStorage.setItem("notes", JSON.stringify(notes));
    populateDropdown();
}

let populateDropdown = function() {
    // remove all the notes from the dropdown so we can repopulate it
    while (savedNotesList.firstChild) {
        savedNotesList.removeChild(savedNotesList.lastChild);
    }
    // populate the dropdown
        $.each(notes, function(arrayItem) {
            var dropdownItemEl = document.createElement("option");
            dropdownItemEl.setAttribute("value", arrayItem);
            dropdownItemEl.innerHTML = notes[arrayItem].title;

            savedNotesList.appendChild(dropdownItemEl);
        })
}

// save note when save button is clicked
$("#notesModule").on("click", "#saveBtn", function() {
    let text = document.getElementById('description').value;
    let title = document.getElementById('title').value;
    let index = notes.findIndex(findTitle => findTitle.title === title);

    if (title === '') {
        // PLEASE ENTER A TITLE POPUP
    } 
    // index of -1 means it is not in the array yet, so make a new entry
    else if (index == -1) {
        notes.push({
            title: title,
            text: text
        })
    } else {
        notes[index].text = text;
    }
    saveNotes();
});

// delete button was clicked, iterate through the array and if current title exists, delete that
$("#notesModule").on("click", "#deleteBtn", function() {
    $.each(notes, function(arrayItem) {
        if (notes[arrayItem].title === document.getElementById('title').value) {
            notes.splice(arrayItem, 1);
        }
    });
    saveNotes();
    populateDropdown();
});
// End Notes Module

// Face Generator Api
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
//End Face Generator Api

///Open5e API functions
let monsterName = "dragon"

let searchForMonster = function(){
    
    fetch("https://api.open5e.com/monsters/?search="+monsterName)
    .then(function(response){
         return response.json();
     })
    .then(function(data){
        console.log(data);
    })
}

let searchClassFunction = function(){
    fetch("https://api.open5e.com/classes/")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

let searchRaceFunction = function(){
    fetch("https://api.open5e.com/races/")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}
//End open5e functions


//Roll Dice EventListener
diceBtn.addEventListener('click', rollFunction);

loadNotes();