let fields = [];
let currentGeneration = 0;
let generationCounter;
let automaticGenerationButton;

function paintBoard() {
    const rows = 20;
    const cols = 20;

    const board = document.createElement('div');
    board.classList.add('board');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < cols; j++) {
            const field = document.createElement('div');
            field.classList.add('field');
            field.dataset.isAlive = false;

            const coordinatesDebug = document.createElement('span');
            coordinatesDebug.classList.add('coordinates');
            field.dataset.x = i;
            field.dataset.y = j;
            coordinatesDebug.innerHTML = `x: ${i} y: ${j}`;
            field.appendChild(coordinatesDebug);

            row.appendChild(field);
            fields.push(field);
        }

        board.appendChild(row);
    }


    const manualGeneration = document.createElement('button');
    manualGeneration.innerHTML = "Next Generation"
    manualGeneration.onclick = function () {
        nextGeneration();
    }

    automaticGenerationButton = document.createElement('button');
    automaticGenerationButton.innerHTML = "Start"
    automaticGenerationButton.onclick = function () {
        automaticGenerationButton.innerHTML = "Stop"
        //todo
        automativGeneration();
    }

    generationCounter = document.createElement('div');
    generationCounter.innerHTML = `Current Generation: ${currentGeneration}`

    document.body.appendChild(board);
    document.body.appendChild(generationCounter);
    document.body.appendChild(automaticGenerationButton);
    document.body.appendChild(manualGeneration);
}

function initializeBoard() {
    paintBoard();
    fields.forEach(field => {
        field.onclick = function () {
            if(field.dataset.isAlive === 'true'){
                field.dataset.isAlive = false;
            }else{
                field.dataset.isAlive = true;
            }
        }
    });
}

function nextGeneration() {
    currentGeneration++;
    generationCounter.innerHTML =  `Current Generation: ${currentGeneration}`

    fields.forEach(field => {
        const x = parseInt(field.dataset.x, 10);
        const y = parseInt(field.dataset.y, 10);

        const neighbours = [];

        var topLeft = document.querySelector(`.field[data-x='${x - 1}'][data-y='${y - 1}']`);
        var topMiddle = document.querySelector(`.field[data-x='${x - 1}'][data-y='${y}']`);
        var topRight = document.querySelector(`.field[data-x='${x - 1}'][data-y='${y + 1}']`);

        var middleLeft = document.querySelector(`.field[data-x='${x}'][data-y='${y - 1}']`);
        var middleRight = document.querySelector(`.field[data-x='${x}'][data-y='${y + 1}']`);

        var bottomLeft = document.querySelector(`.field[data-x='${x + 1}'][data-y='${y - 1}']`);
        var bottomMiddle = document.querySelector(`.field[data-x='${x + 1}'][data-y='${y}']`);
        var bottomRight = document.querySelector(`.field[data-x='${x + 1}'][data-y='${y + 1}']`);

        neighbours.push(topLeft);
        neighbours.push(topMiddle);
        neighbours.push(topRight);
        neighbours.push(middleLeft);
        neighbours.push(middleRight);
        neighbours.push(bottomLeft);
        neighbours.push(bottomMiddle);
        neighbours.push(bottomRight);

        let neighbourCount = 0;

        neighbours.forEach(neighbour => {
            if(neighbour && neighbour.dataset.isAlive === 'true'){
                neighbourCount++;
            }
        });


        console.log(field);
        console.log(`neighbourCount: ${neighbourCount}`);

        if(field.dataset.isAlive === 'true'){
            if(neighbourCount === 2 || neighbourCount === 3){
                field.dataset.keepAlive = true;
            }
        }else{
            if(neighbourCount === 3){
                field.dataset.keepAlive = true; 
            }
        }
    });

    fields.forEach(field => {
        if(field.dataset.keepAlive === 'true'){
            field.dataset.isAlive = true;
        }else{
            field.dataset.isAlive = false;
        }
        delete field.dataset.keepAlive;
    });
}

function automativGeneration(){
    setTimeout(() => {
        nextGeneration();
        automativGeneration();
    }, 100);
}



export default initializeBoard; 