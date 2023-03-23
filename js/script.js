const parentDIV = document.getElementById('parent-div');
const resetBTN = document.getElementById('reset-button');
const gridSizeBTN = document.getElementById('grid-size-button');
const gridLinesBTN = document.getElementById('gl-button');
const defaultDrawingBTN = document.getElementById('default-button');
const rainbowDrawingBTN = document.getElementById('rainbow-button');
const opacityBTN = document.getElementById('opacity-button');

const rainbowHexArr = ['#F94144', '#f3722c', '#f8961e', '#F9C74F', '#90BE6D', '#43AA8B', '#577590']
let currentIndex = 0;

let currentDrawingStyle = defaultDrawingStyle;
let sqPerSide = 16;

function incrementOpacity(childDIV) {
  if (childDIV.style.opacity < 1) {
    childDIV.style.opacity = Number(childDIV.style.opacity) + 0.2;
   }
}

function rainbowDrawingStyle(e) {
  let childDIV = e.target;

  childDIV.style.backgroundColor = rainbowHexArr[currentIndex];

  currentIndex++;

  if (currentIndex == 7) currentIndex = 0;

  incrementOpacity(childDIV);
}

function defaultDrawingStyle(e) {
  let childDIV = e.target;

  childDIV.style.backgroundColor = '#8b8c89';

  incrementOpacity(childDIV);
}

function createEtchASketch() {
  parentDIV.style.gridTemplateRows = `repeat(${sqPerSide}, ${575 / sqPerSide}px)`;
  parentDIV.style.gridTemplateColumns = `repeat(${sqPerSide}, ${575 / sqPerSide}px)`;
  gridSize = sqPerSide**2;

  for (let i = 0; i < gridSize; i++) {
    let childDIV = document.createElement('div');

    childDIV.classList.add('child-div');

    childDIV.addEventListener('mouseover', currentDrawingStyle);

    parentDIV.appendChild(childDIV);
  }
}

function eraseEtchASketch() {
  parentDIV.childNodes.forEach(child => {
    child.removeAttribute('style');
    child.style.backgroundColor = '#EDEDED';
  });
}

function changeGridSize() {
  parentDIV.replaceChildren();

  sqPerSide = prompt('How many squares per side? Between 2 and 100 please!');

  while (sqPerSide > 100 || sqPerSide < 2) {
    alert('Sorry! Incorrect input.');
    sqPerSide = prompt('How many squares per side? Between 2 and 100 please!');
  }

  createEtchASketch();
}

function toggleGridLines() {
  parentDIV.childNodes.forEach(child => {
    child.classList.toggle('child-div');
  })
}

function replaceCurrentEventListener(drawingStyleRemove, drawingStyleAdd) {
  parentDIV.childNodes.forEach(child => {
    child.removeEventListener('mouseover', drawingStyleRemove);
    currentDrawingStyle = drawingStyleAdd;
    child.addEventListener('mouseover', drawingStyleAdd);
  });
}

createEtchASketch();

resetBTN.addEventListener('click', eraseEtchASketch);
gridSizeBTN.addEventListener('click', changeGridSize);
gridLinesBTN.addEventListener('click', toggleGridLines);

defaultDrawingBTN.addEventListener('click', () => {
  replaceCurrentEventListener(rainbowDrawingStyle, defaultDrawingStyle);
});

rainbowDrawingBTN.addEventListener('click', () => {
  replaceCurrentEventListener(defaultDrawingStyle, rainbowDrawingStyle);
});

opacityBTN.addEventListener('click', () => {
  parentDIV.childNodes.forEach(child => child.style.opacity = 1);
});