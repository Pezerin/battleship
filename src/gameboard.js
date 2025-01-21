export function createGameboard() {
  const size = 10;
  const board = Array.from({ length: size }, () => Array(size).fill(null));
  const ships = [];
  const misses = [];

  const placeShip = (ship, startRow, startCol, endRow, endCol) => {
    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const colMin = Math.min(startCol, endCol);
    const colMax = Math.max(startCol, endCol);

    if (rowMin !== rowMax && colMin !== colMax) {
      return false;
    }

    if (
      Math.abs(rowMax - rowMin) + Math.abs(colMax - colMin) + 1 !==
      ship.length
    ) {
      return false;
    }

    for (let i = rowMin; i <= rowMax; i++) {
      for (let j = colMin; j <= colMax; j++) {
        if (board[i][j] !== null) {
          return false;
        }
      }
    }

    for (let i = rowMin; i <= rowMax; i++) {
      for (let j = colMin; j <= colMax; j++) {
        board[i][j] = ship;
      }
    }

    ships.push(ship);

    return true;
  };

  const receiveAttack = (row, col) => {
    const obj = board[row][col];

    if (obj !== null) {
      obj.hit();
    } else {
      misses.push([row, col]);
    }
  };

  const allShipsSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  };

  return { board, misses, placeShip, receiveAttack, allShipsSunk };
}
