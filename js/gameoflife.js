function seed() {
  return [...arguments];
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some((item) => same(cell, item));
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? "\u25A3" : "\u25A2";
};
const corners = (state = []) => {
  if (state.length) {
    const bottomLeftX = Math.min(...state.map((item) => item[0]));
    const bottomLeftY = Math.min(...state.map((item) => item[1]));
    const topRightX = Math.max(...state.map((item) => item[0]));
    const topRightY = Math.max(...state.map((item) => item[1]));
    return {
      topRight: [topRightX, topRightY],
      bottomLeft: [bottomLeftX, bottomLeftY],
    };
  } else {
    return { topRight: [0, 0], bottomLeft: [0, 0] };
  }
};

const printCells = (state) => {
  const corners = this.corners(state);
  let str = "";
  for (let i = corners.bottomLeft[0]; i <= corners.topRight[0]; i++) {
    for (let j = corners.bottomLeft[1]; j <= corners.topRight[1]; j++) {
      str += printCell([i, j], state) === "\u25A2" ? "▢" : "▣";
    }
    str += "\n";
  }
  console.log(str);
  return str;
};

const getNeighborsOf = ([x, y]) => {
  const neighbours = [];
  //horizental neighbours
  neighbours.push([x + 1, y], [x - 1, y]);
  //vertical neighbours
  neighbours.push([x, y + 1], [x, y - 1]);
  //primary diagonal neighbours
  neighbours.push([x + 1, y + 1], [x - 1, y - 1]);
  //primary diagonal neighbours
  neighbours.push([x - 1, y + 1], [x + 1, y - 1]);
  return neighbours;
};

const getLivingNeighbors = (cell, state) => {
  const neighbours = getNeighborsOf(cell);
  const result = neighbours.filter((item) => contains.call(state, item));
  return result;
};

const willBeAlive = (cell, state) => {
  if (
    (contains.call(state, cell) &&
      getLivingNeighbors(cell, state).length === 2) ||
    getLivingNeighbors(cell, state).length === 3
  ) {
    return true;
  } else {
    return false;
  }
};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2],
  ],
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;
