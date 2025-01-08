import { expect, test } from "@jest/globals";
import { createShip } from "../src/ship";

test("Test ship length", () => {
  const ship = createShip(4);
  expect(ship.length).toBe(4);
});

test("hit() increments hit counter", () => {
  const ship = createShip(4);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});

test("isSunk() determines whether a ship is sunk", () => {
  const ship = createShip(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
