import { parseFile } from "./ParseFile.js";

async function main(){
    const data = await parseFile("Day2.txt");
    const matrix = data.split('\r\n').map(s => s.split(' ').map(n => parseInt(n)));

    //console.log(matrix[0]);
    part1(matrix);
}


await main();

// 387 not correct, too high
// 100 too low
function part1(matrix){
    
    var sum = 0;

    for(var r=0; r<matrix.length; r++){
        const info = isRowSafe(matrix[r]);
        //console.log(info);

        if(info[1]){
            sum+=1;
        }
    }

    console.log(sum);


    
  
    
    const increasingRow = [91,94,96,99,100,102,104,106];
    const increasingRowSmall = [81,82,83];
    const decreasingRow = [77,75,73,72,71];
    const mixedRow = [72,73,74,73];
    const mixedRow2 = [10,12,10,12];
    const containsDuplicatesRow = [14,15,16,17,17];
    

    console.log("Expected: true. Actual: ", isRowSafe(increasingRow));
    console.log("Expected: true. Actual: ", isRowSafe(increasingRowSmall));
    console.log("Expected: true. Actual: ", isRowSafe(decreasingRow));
    console.log("Expected: false. Actual: ", isRowSafe(mixedRow));
    console.log("Expected: false. Actual: ", isRowSafe(mixedRow2));
    console.log("Expected: false. Actual: ", isRowSafe(containsDuplicatesRow));

    console.log("Expected: false. Actual: ", isRowSafe([1, 1]));
    console.log("Expected: false. Actual: ", isRowSafe([1, 4, 8, 10]));
}

// bug :(
function isRowSafe(row){
    var firstDiff = row[1] - row[0];
    
    if(firstDiff == 0 || Math.abs(firstDiff > 3)) return [row, false];

    const shouldIncrease = firstDiff > 0;

    for(var i=1; i<row.length - 1; i++){
        const a = row[i];
        const b = row[i+1];
        const diff = b - a;

        if(diff == 0 || Math.abs(diff) > 3) return [row, false];
        if(shouldIncrease && diff < 0) return [row, false];
        if(!shouldIncrease && diff > 0) return [row, false];
    }

    return [row, true];
}