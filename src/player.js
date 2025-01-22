import { createGameboard } from "./gameboard.js";

export function createPlayer(isComputer = false) {
  const gameboard = createGameboard();

  return { gameboard, isComputer };
}
