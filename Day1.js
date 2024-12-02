import { parseFile } from "./ParseFile.js";

function part1(arr1, arr2){
    arr1.sort();
    arr2.sort();

    const len = arr1.length;
    var sum = 0;

    for(var i=0; i<len; i++){
        const diff = Math.abs(arr1[i]- arr2[i]);
        sum +=diff;
    }

    return sum;
}

function part2(left, right){
    var score = 0;

    left.sort();
    right.sort();

    for (let i = 0; i < left.length; i++) {
        const num = left[i];
        const rightOccurences = right.filter((n) => n == num).length;
        score += num * rightOccurences;
    }

    return score;
}

async function main(){
    const data = await parseFile("Day1.txt");
    const arr1 = [];
    const arr2 = [];

    data.split('\r\n').forEach(str => {
        const tmp = str.split('   ');
        arr1.push(tmp[0]);
        arr2.push(tmp[1]);
    })

    const sum = part1(arr1,arr2);
    console.log("Part 1: ", sum);

    const score = part2(arr1,arr2);
    console.log("Part 2: ", score);
}


await main();