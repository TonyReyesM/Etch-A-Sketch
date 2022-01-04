const body = document.body
const game = document.querySelector('.game')

body.onload = createGrid();

//GRID FUNCTIONALITY----------------------------------------------------------------------------------

function createGrid(size = 16) {
    if(size<1 || size>100) size = 16
    const grid = document.createElement('div')
    grid.classList.add('grid')
    for(let i=0; i<size; i++){
        let row = document.createElement('div')
        row.classList.add('row')
            for(let j=0; j<size; j++){
                let div = document.createElement('div')
                div.classList.add('tile')
                row.append(div)
            }
        grid.append(row)
    }
    game.append(grid);
    pencil();
};

function createNewGrid(){
    const size = document.querySelector('input').value
    eraseAll();
    const grid = document.getElementsByClassName('grid');
    grid[0].remove();
    createGrid(size)
}

function eraseAll(){
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => tile.style.backgroundColor = 'rgb(233, 233, 233)')
}

//PENCIL FUNCTIONALITY---------------------------------------------------------------------------

let isColored = false
let pencilType = 'black' //agregar funcionalidad para color con esta variable

function activateColor(){
    isColored = true
}

function changeColor(){
    if(isColored === true){
        if(pencilType === 'black') colorBlack(this)
        if(pencilType === 'rgb') colorRGB(this)
        if(pencilType === 'eraser') erase(this)
    }
    else return
}

function stopColor(){
    isColored = false
}

function pencil(){
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => tile.addEventListener('mousedown', activateColor))
    tiles.forEach(tile => tile.addEventListener('mousemove', changeColor))
    tiles.forEach(tile => tile.addEventListener('mouseup', stopColor))
}

//PENCIL TYPES-----------------------------------------------------------------------

function colorBlack(element){
    element.style.background = 'black'
}

function colorRGB(element) {
    const r = Math.floor(Math.random() * 255) + 1
    const g = Math.floor(Math.random() * 255) + 1
    const b = Math.floor(Math.random() * 255) + 1
    element.style.backgroundColor = `rgb(${r},${g},${b})`
}

function erase(element){
    element.style.backgroundColor = 'rgb(233, 233, 233)';
}

//BUTTONS---------------------------------------------------------------------------------------------
function buttonChange(element) {
    const pencilButtons = document.querySelectorAll('.pencil');
    pencilButtons.forEach(button => button.classList.remove('selected'));
    element.classList.add('selected');
}

function buttonClick(element) {
    
    element.classList.remove('selected');
}

const clearButton = document.querySelector('.clear')
//clearButton.addEventListener('click', eraseAll)
clearButton.addEventListener('mousedown', () => clearButton.classList.add('selected'))
clearButton.addEventListener('mouseup', () => {
    eraseAll();
    clearButton.classList.remove('selected')
})

const createGridButton = document.querySelector('.grid-create')
//createGridButton.addEventListener('click', createNewGrid)
createGridButton.addEventListener('mousedown', () => createGridButton.classList.add('selected'))
createGridButton.addEventListener('mouseup', () => {
    createNewGrid();
    createGridButton.classList.remove('selected');
})

const blackPencilButton = document.querySelector('.black-pencil')
blackPencilButton.addEventListener('click', () => {
    pencilType = 'black';
    buttonChange(blackPencilButton)
})

const rgbPencilButton = document.querySelector('.rgb-pencil')
rgbPencilButton.addEventListener('click', () => {
    pencilType = 'rgb'   
    buttonChange(rgbPencilButton)
})

const eraserButton = document.querySelector('.eraser')
eraserButton.addEventListener('click', () => {
    pencilType = 'eraser'    
    buttonChange(eraserButton)
})

