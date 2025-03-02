import "./styles.css";
import { createPlayer } from "./player.js";
import { createShip } from "./ship.js";

const player1 = createPlayer();
const player2 = createPlayer(true);
const renderGameboard = (player) => {
  let div = document.getElementById(player === player2 ? "player2" : "player1");

  const gameboard = document.createElement("div");
  gameboard.classList.add("gameboard");

  for (let i = 0; i < player.gameboard.board.length; i++) {
    for (let j = 0; j < player.gameboard.board[0].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (player.gameboard.board[i][j] !== null && player === player1)
        cell.classList.add("ship");

      if (player === player1) cell.id = `${i}${j}`;

      if (player === player2)
        cell.addEventListener("click", () => {
          if (
            !player1.gameboard.allShipsSunk() &&
            !player2.gameboard.allShipsSunk() &&
            !cell.classList.contains("hit") &&
            !cell.classList.contains("miss")
          ) {
            if (
              !cell.classList.contains("hit") &&
              !cell.classList.contains("miss")
            ) {
              if (player2.gameboard.receiveAttack(i, j)) {
                cell.classList.add("hit");
              } else {
                cell.classList.add("miss");
              }
            }

            setTimeout(() => {
              if (player2.gameboard.allShipsSunk()) {
                alert("Player 1 Wins!");
              }
            }, 100);

            // Computer attack logic
            let x, y;
            do {
              x = Math.floor(Math.random() * 10);
              y = Math.floor(Math.random() * 10);
            } while (
              player1.gameboard.misses.some((m) => m[0] === x && m[1] === y)
            );

            const cell2 = document.getElementById(`${x}${y}`);
            if (
              !cell2.classList.contains("hit") &&
              !cell2.classList.contains("miss")
            ) {
              if (player1.gameboard.receiveAttack(x, y)) {
                cell2.classList.add("hit");
              } else {
                cell2.classList.add("miss");
              }
            }

            setTimeout(() => {
              if (player1.gameboard.allShipsSunk()) {
                alert("Player 2 Wins!");
              }
            }, 100);
          }
        });

      gameboard.appendChild(cell);
    }
  }

  div.appendChild(gameboard);
};

const shipSizes = [2, 3, 3, 4, 5];

// Let player place ships
for (let i = 0; i < shipSizes.length; i++) {
  let point1 = prompt(
    `Enter starting coordinate of ${shipSizes[i]}-space ship (i.e. 0,0): `
  );
  let point2 = prompt(
    `Enter end coordinate of ${shipSizes[i]}-space ship (i.e. 0,1): `
  );

  let [x1, y1] = point1.split(",").map(Number);
  let [x2, y2] = point2.split(",").map(Number);

  const ship = createShip(shipSizes[i]);
  if (!player1.gameboard.placeShip(ship, x1, y1, x2, y2)) {
    alert("Error: incorrect coordinates, please enter again");
    i--;
  }
}

// Randomize computer placements
for (let i = 0; i < shipSizes.length; i++) {
  let shipPlaced = false;
  const ship = createShip(shipSizes[i]);

  while (!shipPlaced) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    const isVertical = Math.random() < 0.5;

    if (isVertical) {
      if (row + shipSizes[i] - 1 < 10) {
        // If it fits vertically
        shipPlaced = player2.gameboard.placeShip(
          ship,
          row,
          col,
          row + shipSizes[i] - 1,
          col
        );
      }
    } else {
      if (col + shipSizes[i] - 1 < 10) {
        // If it fits horizontally
        shipPlaced = player2.gameboard.placeShip(
          ship,
          row,
          col,
          row,
          col + shipSizes[i] - 1
        );
      }
    }
  }
}

renderGameboard(player1);
renderGameboard(player2);
