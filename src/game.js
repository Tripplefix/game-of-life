const cols = 40;
const rows = 40;
let currentGeneration = 0;
let generationCounter;
let board1; 
let board2;
let boardContainer;

let intervall;

function setupBoard(){
    boardContainer = document.createElement('div');
    boardContainer.classList.add('board');
    document.body.appendChild(boardContainer);

    board1 = makeFieldsArray();
    board2 = makeFieldsArray();

    board1 = initializeFieldsRandom(board1);
    board2 = initializeFields(board2);

    paintBoard(board1);

    generationCounter = document.createElement('div');
    generationCounter.innerHTML = `Current Generation: ${currentGeneration}`
    
    document.body.appendChild(generationCounter);
}

function startGenerations(){
    
    intervall = setInterval(() => {
        nextGeneration();
    }, 100);
}

function stopGenerations(){
    clearInterval(intervall)
}

function nextGeneration(){
    let oldBoard;
    let newBoard;
    if(currentGeneration % 2 === 0){

        oldBoard = board1;
        newBoard = board2;
    }else{

        oldBoard = board2;
        newBoard = board1;
    }

    

    for (let x = 0; x < oldBoard.length; x++) {
        for (let y = 0; y < oldBoard[x].length; y++) {
            let neighbourCount = 0;

            if(x > 0){
                neighbourCount += oldBoard[x-1][y] 

                if(y > 0){
                    neighbourCount += oldBoard[x-1][y-1] 
                }
                if(y < rows-1){
                    neighbourCount += oldBoard[x-1][y+1] 
                }
            }
            if(x < cols-1){
                neighbourCount += oldBoard[x+1][y] 

                if(y > 0){
                    neighbourCount += oldBoard[x+1][y-1] 
                }
                if(y < rows-1){
                    neighbourCount += oldBoard[x+1][y+1];
                }
            }
            
            if(y > 0){
                neighbourCount += oldBoard[x][y-1] 
            }
            if(y < rows-1){
                neighbourCount += oldBoard[x][y+1] 
            }

            newBoard[x][y] = 0;
            if(oldBoard[x][y] === 1){
                if(neighbourCount === 2 || neighbourCount === 3){
                    newBoard[x][y] = 1;
                }
            }else{
                if(neighbourCount === 3){
                    newBoard[x][y] = 1;
                }
            }
        }
    }

    oldBoard = newBoard;
    currentGeneration++;
    generationCounter.innerHTML = `Current Generation: ${currentGeneration}`
    paintBoard(newBoard);
}

function initializeFieldsRandom(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = Math.floor(Math.random() * 2);
        }
    }

    return arr;
}

function initializeFields(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

function paintBoard(board){
    
    boardContainer.innerHTML = '';
    
    board.forEach((row, i) => {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');

        row.forEach((col, j) => {
            const fieldContainer = document.createElement('div');
            fieldContainer.classList.add('field');

            if(col === 1) {
                fieldContainer.classList.add('alive');
            }

            const coordinatesDebug = document.createElement('span');
            coordinatesDebug.classList.add('coordinates');
            coordinatesDebug.innerHTML = `x: ${j} y: ${i}`;
            fieldContainer.appendChild(coordinatesDebug);

            rowContainer.appendChild(fieldContainer);
        });

        boardContainer.appendChild(rowContainer);
    });
}

function makeFieldsArray(){
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

export { setupBoard, nextGeneration, startGenerations, stopGenerations }; 