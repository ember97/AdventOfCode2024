import { parseFile } from "./ParseFile.js";

class Direction {
    static N = "N";
    static E = "E";
    static S = "S";
    static W = "W";
    static NE = "NE";
    static SE = "SE";
    static SW = "SW";
    static NW = "NW";
}

const allDirections = [
    Direction.N, Direction.E, Direction.S, Direction.W,
    Direction.NE, Direction.SE, Direction.SW, Direction.NW
];

async function main() {
    const data = await parseFile("Day4.txt");
    const matrix = data.split('\n').filter(line => line.trim()).map(line => line.trim().split(''));
    const sum = part1(matrix);
    console.log(sum);

    const sumCross = part2(matrix);
    console.log(sumCross);
}

await main();



function part1(matrix) {
    let sum = 0;
    const arr = ['M','A','S']

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] == 'X') {
                //console.log("Found X");
                sum += countWordOccurances(matrix, col, row, arr);
            }
        }
    }

    return sum;
}

function countWordOccurances(matrix, col, row, arr) {
    let sum = 0;

    allDirections.forEach(dir => {
        //console.log(dir);
        if (wordInDirection(matrix, dir, col, row, arr) != undefined) {
            sum += 1;
        }
    });

    return sum;
}





function wordInDirection(matrix, direction, col, row, arr) {
    const width = matrix[0].length;
    const height = matrix.length;


    if(validCoord(col,row,width,height) == undefined) return undefined;


    let currentCol = col;
    let currentRow = row;

    for (let i = 0; i < arr.length; i++) {
        const currentPos = getCoordInDirection(direction, [currentCol, currentRow], width, height);
        if (!currentPos) return undefined;

        currentCol = currentPos[0];
        currentRow = currentPos[1];

        const letter = matrix[currentRow][currentCol]; 
        if (letter !== arr[i]) return undefined;
    }

    return [col,row]
}

function getCoordInDirection(direction, pos, width, height) {
    const col = pos[0];
    const row = pos[1];

    switch (direction) {
        case Direction.N:
            return validCoord(col, row - 1, width, height);
        case Direction.E:
            return validCoord(col + 1, row, width, height);
        case Direction.S:
            return validCoord(col, row + 1, width, height);
        case Direction.W:
            return validCoord(col - 1, row, width, height);
        case Direction.NE:
            return validCoord(col + 1, row - 1, width, height);
        case Direction.SE:
            return validCoord(col + 1, row + 1, width, height);
        case Direction.SW:
            return validCoord(col - 1, row + 1, width, height);
        case Direction.NW: 
            return validCoord(col - 1, row - 1, width, height);
    }
}

function validCoord(col, row, width, height) {
    if (col < 0 || row < 0 || col >= width || row >= height) return undefined; 
    return [col, row];
}


function part2(matrix){
    const submatrixes = getSubMatrixes3x3(matrix);
    let sum = 0;

    submatrixes.forEach(m => {
        if(hasCrossMAS(m)) sum+=1
    })

    return sum;
}

function hasCrossMAS(submatrix){
    const word = "MAS";
    let nOfMas = 0;
    let goesNorth = false;
    let goesWest = false;
    let goesNorthEast = false;
    let goesSouthEast = false;

    if(submatrix[1][1] != 'A') return false;

    const north = [submatrix[0][1],submatrix[1][1],submatrix[2][1]];
    const west = [submatrix[1][0],submatrix[1][1],submatrix[1][2]];
    const northEast = [submatrix[2][0],submatrix[1][1],submatrix[0][2]];
    const southEast = [submatrix[0][0],submatrix[1][1],submatrix[2][2]];

    if(north.join('') == word || north.reverse().join('') == word) goesNorth = true;
    if(west.join('') == word || west.reverse().join('') == word) goesWest = true;
    if(northEast.join('') == word || northEast.reverse().join('') == word) goesNorthEast = true;
    if(southEast.join('') == word || southEast.reverse().join('') == word) goesSouthEast = true;

    const basicCross = goesNorth && goesWest;
    const diagonalCross = goesNorthEast && goesSouthEast;

    if(basicCross){
        console.log("Basic cross");
        submatrix.forEach(r => {
            console.log(r)
            console.log("")
        }
        );
    }
    if(diagonalCross){
        console.log("Diagonal cross");
        submatrix.forEach(r => {
            console.log(r)
            console.log("")
        }
        );
    }

    return basicCross || diagonalCross;
}



function getSubMatrixes3x3(matrix){
    const submatrixes = [];

    for(let row=0; row<matrix.length-2; row++){
        for(let col=0; col<matrix[0].length-2; col++){
            const row1 = [matrix[row][col], matrix[row][col+1], matrix[row][col+2]];
            const row2 = [matrix[row+1][col], matrix[row+1][col+1], matrix[row+1][col+2]];
            const row3 = [matrix[row+2][col], matrix[row+2][col+1], matrix[row+2][col+2]];
            const m = [row1,row2,row3];
            submatrixes.push(m);

            //console.log(m);
            //console.log("");
        }
    }

    return submatrixes;
}


