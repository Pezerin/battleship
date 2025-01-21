import { expect, test } from "@jest/globals";
import { createGameboard } from "../src/gameboard";
import { createShip } from "../src/ship";

test("placeShip correctly places ship at specific coordinates", () => {
  const gameboard = createGameboard();
  const ship = createShip(3);

  const placed = gameboard.placeShip(ship, 0, 0, 2, 0);

  expect(placed).toBe(true);
  expect(gameboard.board[0][0]).toBe(ship);
  expect(gameboard.board[1][0]).toBe(ship);
  expect(gameboard.board[2][0]).toBe(ship);
  expect(gameboard.board[3][0]).toBeNull();
  expect(gameboard.board[0][1]).toBeNull();
});

test("placeShip fails with invalid coordinates", () => {
  const gameboard = createGameboard();
  const ship = createShip(3);

  const invalidPlacement = gameboard.placeShip(ship, 0, 0, 1, 1);
  expect(invalidPlacement).toBe(false);
});

test("placeShip fails with overlapping ships", () => {
  const gameboard = createGameboard();
  const ship1 = createShip(3);
  const ship2 = createShip(2);

  gameboard.placeShip(ship1, 0, 0, 2, 0);
  const overlappingPlacement = gameboard.placeShip(ship2, 1, 0, 2, 0);

  expect(overlappingPlacement).toBe(false);
});

test("receiveAttack correctly handles hits", () => {
  const gameboard = createGameboard();
  const ship = createShip(2);

  gameboard.placeShip(ship, 0, 0, 0, 1);
  gameboard.receiveAttack(0, 0);

  expect(ship.getHits()).toBe(1);
});

test("receiveAttack correctly handles misses", () => {
  const gameboard = createGameboard();
  const ship = createShip(2);

  gameboard.placeShip(ship, 0, 0, 1, 1);
  gameboard.receiveAttack(2, 2);

  expect(gameboard.misses).toContainEqual([2, 2]);
});

test("allShipsSunk correctly reports when all ships are sunk", () => {
  const gameboard = createGameboard();

  const ship1 = createShip(2);
  const ship2 = createShip(3);

  gameboard.placeShip(ship1, 0, 0, 0, 1);
  gameboard.placeShip(ship2, 2, 0, 2, 2);

  expect(gameboard.allShipsSunk()).toBeFalsy();

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  expect(ship1.isSunk()).toBeTruthy();
  expect(gameboard.allShipsSunk()).toBeFalsy();

  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(2, 2);
  expect(ship2.isSunk()).toBeTruthy();
  expect(gameboard.allShipsSunk()).toBeTruthy();
});
