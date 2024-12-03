import { parseFile } from "./ParseFile.js";

const Type = {
    Number: 'Number',
    LeftPar: 'LeftPar',
    RightPar: 'RightPar',
    Comma: 'Comma',
    Other: 'Other'
  };



async function main(){
    const data = await parseFile("Day3.txt");
    //console.log(data);
    const sum1 = part1(data);
    const sum2 = part2(data);
    console.log("Part1: ",sum1);
    console.log("Part2: ",sum2);
}

await main();






function part1(str){
    let index = 0;
    let sum = 0;

    while(index < str.length){
        if(str.substring(index, index+4) == "mul("){
            index+=4;
    
            const left = [];
            const right = [];
            let hasSeenComma = false;

            while(true){
                const char = str.charAt(index);

                if(isComma(char) && !hasSeenComma && left.length > 0){
                    hasSeenComma = true;
                }
                else if(isNumber(char) && !hasSeenComma && left.length < 3){
                    left.push(char);
                }
                else if(isNumber(char) && hasSeenComma && right.length < 3){
                    right.push(char);
                }
                else if(isRightPar(char) && right.length > 0){
                    const leftNum = parseInt(left.join(''));
                    const rightNum = parseInt(right.join(''));
                    sum+=(leftNum*rightNum);
                    break;
                }
                else{
                    break;
                }

                index+=1;
            }
            
        }

        index+=1;
    }

    return sum;
}




function part2(str){
    let index = 0;
    let sum = 0;
    let mulIsEnabled = true;

    while(index < str.length){
        if(str.substring(index, index+7) == "don't()"){
            mulIsEnabled = false;
            index+=7;
        }
        if(str.substring(index, index+4) == "do()"){
            mulIsEnabled = true;
            index+=4;
        }
        if(mulIsEnabled && str.substring(index, index+4) == "mul("){
            index+=4;
    
            const left = [];
            const right = [];
            let hasSeenComma = false;

            while(true){
                const char = str.charAt(index);

                if(isComma(char) && !hasSeenComma && left.length > 0){
                    hasSeenComma = true;
                }
                else if(isNumber(char) && !hasSeenComma && left.length < 3){
                    left.push(char);
                }
                else if(isNumber(char) && hasSeenComma && right.length < 3){
                    right.push(char);
                }
                else if(isRightPar(char) && right.length > 0){
                    const leftNum = parseInt(left.join(''));
                    const rightNum = parseInt(right.join(''));
                    sum+=(leftNum*rightNum);
                    break;
                }
                else{
                    break;
                }

                index+=1;
            }
            
        }

        index+=1;
    }

    return sum;
}









function getType(char){
    if(!isNaN(char)) return Type.Number;
    else if(char === '(') return Type.LeftPar;
    else if(char === ')') return Type.RightPar;
    else if(char === ',') return Type.Comma;
    else return Type.Other;
}

function isNumber(input){
    return getType(input) == Type.Number;
}

function isLeftPar(input){
    return getType(input) == Type.LeftPar;
}

function isRightPar(input){
    return getType(input) == Type.RightPar;
}

function isComma(input){
    return getType(input) == Type.Comma;
}

function isOther(input){
    return getType(input) == Type.Other;
}