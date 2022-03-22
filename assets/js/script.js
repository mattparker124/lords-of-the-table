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