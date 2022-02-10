const canvasWidth = 800;
const canvasHeight = 800;
const resolution = 10;

let cols;
let rows;

let currentGeneration = 0;
let generationCounter;
let board1; 
let board2;
let boardContainer;

let intervall;

function setupBoard(){
    cols = canvasWidth / resolution;
    rows = canvasHeight / resolution;

    boardContainer = document.createElement('canvas');
    boardContainer.width = canvasWidth;
    boardContainer.height = canvasHeight;
    document.body.appendChild(boardContainer);



    board1 = makeFieldsArray();
    board2 = makeFieldsArray();

    board1 = initializeFieldsWithGlider(board1);
    board2 = initializeFields(board2);

    paintBoard(board1);

    generationCounter = document.createElement('div');
    generationCounter.innerHTML = `Current Generation: ${currentGeneration}`
    
    document.body.appendChild(generationCounter);
}

function clearBoard(){
    board1 = makeFieldsArray();
    board2 = makeFieldsArray();
    stopGenerations();
    nextGeneration();
    currentGeneration = 0;
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

    let originalBoard = board1;
    let newBoard = board2;

    for (let x = 0; x < originalBoard.length; x++) {
        for (let y = 0; y < originalBoard[x].length; y++) {
            let neighbourCount = 0;

           /* for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if(x===0 && y===0) continue;
                    try {
                        neighbourCount += oldBoard[x+i][y+j];
                    } catch (err) {
                        
                    }
                }
            }*/

            if(x > 0){
                neighbourCount += originalBoard[x-1][y] 

                if(y > 0){
                    neighbourCount += originalBoard[x-1][y-1] 
                }
                if(y < rows-1){
                    neighbourCount += originalBoard[x-1][y+1] 
                }
            }
            if(x < cols-1){
                neighbourCount += originalBoard[x+1][y] 

                if(y > 0){
                    neighbourCount += originalBoard[x+1][y-1] 
                }
                if(y < rows-1){
                    neighbourCount += originalBoard[x+1][y+1];
                }
            }
            
            if(y > 0){
                neighbourCount += originalBoard[x][y-1] 
            }
            if(y < rows-1){
                neighbourCount += originalBoard[x][y+1] 
            }

            newBoard[x][y] = 0;
            if(originalBoard[x][y] === 1){
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
    
    //swap boards
    let tempBoard = board1;
    board1 = board2;
    board2 = tempBoard;

    originalBoard = newBoard;
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

function initializeFieldsWithGlider(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }

    for (let i = 0; i < 50; i++) {
        insertGliderAt(arr, Math.floor(Math.random() * (cols-4)), Math.floor(Math.random() * (rows-4)))
    }


    return arr;
}

function insertGliderAt(arr, positionX, positionY){
    let glider = 
    [
        [0,1,0],
        [0,0,1],
        [1,1,1]
    ];

    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        glider = glider[0].map((_, index) => glider.map(row => row[index]).reverse())
    }

    for (let i = 0; i < glider.length; i++) {
        Array.prototype.splice.apply(arr[i+positionX], [positionY, glider[i].length].concat(glider[i]));
    }
}

function paintBoard(board){

    var ctx = boardContainer.getContext('2d');
    
    boardContainer.innerHTML = '';
    
    board.forEach((row, x) => {
        row.forEach((col, y) => {
            const fieldContainer = document.createElement('div');
            fieldContainer.classList.add('field');

            if(col === 1) {
                ctx.fillStyle = 'rgb(200, 200, 200)';
            }else{
                ctx.fillStyle = 'rgb(0, 0, 0)';
            }

            ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
        });
    });
}

function makeFieldsArray(){
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

export { setupBoard, nextGeneration, startGenerations, stopGenerations, clearBoard }; 