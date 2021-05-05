const grid = document.querySelector('.grid');
const rows = 10;
const columns = 10;
const numOfBombs = 10;
const tilesObj = {};

// initalize grid
for (let i = 1; i <= rows; i++) {
  for (let n = 1; n <= columns; n++) {
    const tileDiv = document.createElement('div');
    const tileID = `${('0' + i).slice(-2)}${('0' + n).slice(-2)}`;

    tileDiv.setAttribute('position', tileID);
    tileDiv.setAttribute('state', 'closed');
    tileDiv.addEventListener('click', changeTileState);

    tilesObj[tileID] = tileDiv;
    grid.appendChild(tileDiv);
  }
}

//add bombs

function changeTileState(e) {
  e.target.setAttribute('state', 'open');
}
