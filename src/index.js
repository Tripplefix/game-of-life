import _ from 'lodash';
import './style.css';
import initializeBoard from './print.js';
import {setupBoard,nextGeneration,startGenerations,stopGenerations,clearBoard} from './game-canvas'

setupBoard();


const manualGeneration = document.createElement('button');
manualGeneration.innerHTML = "Next Generation"
manualGeneration.onclick = function () {
    nextGeneration();
}

const automaticGenerationButton = document.createElement('button');
automaticGenerationButton.innerHTML = "Start"
automaticGenerationButton.onclick = function () {

    if(automaticGenerationButton.innerHTML === "Start"){
        automaticGenerationButton.innerHTML = "Stop"
        startGenerations();
    }else{
        automaticGenerationButton.innerHTML = "Start"
        stopGenerations();
    }

}
const clearButton = document.createElement('button');
clearButton.innerHTML = "Clear"
clearButton.onclick = function () {
    clearBoard();
}
document.body.appendChild(clearButton);
document.body.appendChild(automaticGenerationButton);
document.body.appendChild(manualGeneration);

//initializeBoard();

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}