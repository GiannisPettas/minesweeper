const grid = document.querySelector('.grid');
const rows = 13;
const columns = 10;
const numOfBombs = 10;
const tilesObj = {};

// initalize grid
for (let i = 1; i <= rows; i++) {
  for (let n = 1; n <= columns; n++) {
    const tileDiv = document.createElement('div');
    const tileID = joinTwoNumbersWithPadding(n, i);
    tileDiv.x = n;
    tileDiv.y = i;
    tileDiv.tileID = tileID;
    tileDiv.bomb = false;

    tileDiv.setAttribute('position', tileID);
    tileDiv.setAttribute('state', 'closed');
    tileDiv.addEventListener('click', changeTileState);

    tilesObj[tileID] = tileDiv;
    grid.appendChild(tileDiv);
  }
}

//add bombs
for (let i = numOfBombs; i > 0; ) {
  let bombX = Math.floor(Math.random() * columns) + 1;
  let bombY = Math.floor(Math.random() * rows) + 1;
  let tileWithBomb = joinTwoNumbersWithPadding(bombX, bombY);
  tilesObj[tileWithBomb].bomb = true;
  tilesObj[tileWithBomb].setAttribute('bomb', 'true');
  i--;
}

function changeTileState(e) {
  const clickedTile = e.target;
  clickedTile.setAttribute('state', 'open');
  console.log(`${clickedTile.x},${clickedTile.y},${clickedTile.tileID}`);
}

function joinTwoNumbersWithPadding(num1, num2, padding = 2) {
  return `${('0' + num1).slice(-2)}${('0' + num2).slice(-2)}`;
}
