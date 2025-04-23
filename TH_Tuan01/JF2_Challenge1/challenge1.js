var dolphines = []
var koalas = []
var avg_dolphines;
var avg_koalas;

function checkWinner(avg_dolphines, avg_koalas){
    if(avg_dolphines >= 2 * avg_koalas){
        return "Dolphines Win !"
    }else if(avg_koalas >= 2 * avg_dolphines){
        return "Koalas Win !"
    }else{
        return "No team wins !"
    }
}

const calcAverage = (dolphines, koalas) => {
    avg_dolphines = dolphines.reduce((acc, numb) => acc + numb, 0) /dolphines.length
    console.log("Dolphines score: ", avg_dolphines.toFixed(1));
    
    avg_koalas = koalas.reduce((acc, numb) => acc + numb, 0) /koalas.length
    console.log("Koalas score: ", avg_koalas.toFixed(1));
} ;

console.log("DATA 1");
dolphines = [44, 23, 71.]
koalas = [65, 54, 49]
calcAverage(dolphines, koalas);
console.log("Result: ", checkWinner(avg_dolphines, avg_koalas));

console.log("\n\n\nDATA 2");
dolphines = [85, 54, 41]
koalas = [23, 34, 27]
calcAverage(dolphines, koalas);
console.log("Result: ", checkWinner(avg_dolphines, avg_koalas));