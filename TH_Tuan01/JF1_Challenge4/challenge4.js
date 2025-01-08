var tip;
var bill = [275, 40, 430];
var total;

function calcBill(bill){
    bill >= 50 && bill <= 300 ? tip = bill * 0.15 : tip = bill * 0.2
    return tip
}

console.log("DATA 1");
for(let i = 0; i < bill.length; i++){
    tip = calcBill(bill[i])
    total = bill[i] + tip;
    console.log("The bill was",bill[i],", the tip was",tip ,", and the total value",total,"\n\n");
}
