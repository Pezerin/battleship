export function createShip(length) {
  let hits = 0;

  const hit = () => {
    hits++;
  };

  const getHits = () => {
    return hits;
  };

  const isSunk = () => {
    if (hits >= length) {
      return true;
    }
    return false;
  };

  return { length, hit, getHits, isSunk };
}
