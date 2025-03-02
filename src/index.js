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

      gameboard.appendChild(cell);
    }
  }

  div.appendChild(gameboard);
};

const ship1 = createShip(2);
const ship2 = createShip(2);

player1.gameboard.placeShip(ship1, 0, 0, 0, 1);
player2.gameboard.placeShip(ship2, 0, 0, 0, 1);

renderGameboard(player1);
renderGameboard(player2);
