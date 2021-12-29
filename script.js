const body = document.body

body.onload = createGrid();

function createGrid(size = 16) {
    const container = document.createElement('div')
    container.classList.add('container')
    for(let i=0; i<size; i++){
        let row = document.createElement('div')
        row.classList.add('row')
            for(let j=0; j<size; j++){
                let div = document.createElement('div')
                div.classList.add('tile')
                row.append(div)
            }
        container.append(row)
    }
    body.append(container);
    hoverEventCreator();
};

function changeColor(){
    this.classList.add('hovering')
}

function resetGame(){
    const size = window.prompt('How many tiles per row and column?', 16)
    eraseTiles();
    const container = document.getElementsByClassName('container');
    container[0].remove();
    createGrid(size);
}

function eraseTiles(){
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => tile.classList.remove('hovering'))
}

function hoverEventCreator(){
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => tile.addEventListener('mouseover', changeColor))
}

const resetButton = document.querySelector('.reset')
resetButton.addEventListener('click', resetGame)