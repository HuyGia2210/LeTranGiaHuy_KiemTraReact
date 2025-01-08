var dolphines = []
var koalas = []
var avg_dolphines;
var avg_koalas;
var result;

console.log("DATA 1");
dolphines = [96, 108, 89]
avg_dolphines = dolphines.reduce((acc, numb) => acc + numb, 0) /dolphines.length ;
console.log("Dolphines score: ", avg_dolphines.toFixed(2));
koalas = [88, 91, 110]
avg_koalas = koalas.reduce((acc, numb) => acc + numb, 0) /koalas.length ;
console.log("Koalas score: ", avg_koalas.toFixed(2));
if(avg_dolphines === avg_koalas){
    result = "Draw"
}else if (avg_dolphines > avg_koalas){
    result = "Dolphines win !"
}else{
    result = "Koalas win !"
}
console.log("Result: ",result);


console.log("\n\nDATA Bonus 1");
dolphines = [97, 112, 101]
avg_dolphines = dolphines.reduce((acc, numb) => acc + numb, 0) /dolphines.length ;
console.log("Dolphines score: ", avg_dolphines.toFixed(2));
koalas = [109, 95, 123]
avg_koalas = koalas.reduce((acc, numb) => acc + numb, 0) /koalas.length ;
console.log("Koalas score: ", avg_koalas.toFixed(2));
if(avg_dolphines < 100 && avg_koalas < 100){
    result = "No one win !"
}else{
    if(avg_dolphines === avg_koalas){
        result = "Draw"
    }else if (avg_dolphines > avg_koalas){
        result = "Dolphines win !"
    }else{
        result = "Koalas win !"
    }
}
console.log("Result: ",result);


console.log("\n\nDATA Bonus 2");
dolphines = [97, 112, 101]
avg_dolphines = dolphines.reduce((acc, numb) => acc + numb, 0) /dolphines.length ;
console.log("Dolphines score: ", avg_dolphines.toFixed(2));
koalas = [109, 95, 106]
avg_koalas = koalas.reduce((acc, numb) => acc + numb, 0) /koalas.length ;
console.log("Koalas score: ", avg_koalas.toFixed(2));
if(avg_dolphines < 100 && avg_koalas < 100){
    result = "No one win !"
}else{
    if(avg_dolphines === avg_koalas){
        result = "Draw"
    }else if (avg_dolphines > avg_koalas){
        result = "Dolphines win !"
    }else{
        result = "Koalas win !"
    }
}
console.log("Result: ",result);

