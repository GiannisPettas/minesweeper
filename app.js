const grid = document.querySelector('.grid');
const rows = 13;
const columns = 10;
const numOfBombs = 20;
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
    tileDiv.bombDetectNum = 0;

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
  let tileWithBombDiv = tilesObj[tileWithBomb];
  if (!tileWithBombDiv.bomb) {
    tileWithBombDiv.bomb = true;
    tileWithBombDiv.setAttribute('bomb', 'true');
    tileWithBombDiv.bombDetectNum = 'B';
    tileWithBombDiv.innerText = tileWithBombDiv.bombDetectNum;

    const arrayWithTilesAroundTile = findAllTilesAroundTile(tileWithBombDiv);
    for (let i = 0; i < arrayWithTilesAroundTile.length; i++) {
      if (arrayWithTilesAroundTile[i].bomb !== true) {
        arrayWithTilesAroundTile[i].bombDetectNum += 1;
        arrayWithTilesAroundTile[i].innerText =
          arrayWithTilesAroundTile[i].bombDetectNum;
      }
    }
    i--;
  }
}

function changeTileState(e) {
  const clickedTile = e.target;
  clickedTile.setAttribute('state', 'open');
}

function joinTwoNumbersWithPadding(num1, num2, padding = 2) {
  return `${('0' + num1).slice(-2)}${('0' + num2).slice(-2)}`;
}

function findAllTilesAroundTile(tile) {
  const arrayWithTilesAroundTile = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (!(x === 0 && y === 0)) {
        const tileAroundID = joinTwoNumbersWithPadding(tile.x + x, tile.y + y);
        const tileAround = tilesObj[tileAroundID];
        if (tileAround) {
          arrayWithTilesAroundTile.push(tileAround);
        }
      }
    }
  }
  return arrayWithTilesAroundTile;
}
