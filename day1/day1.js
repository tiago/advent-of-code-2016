#! /usr/bin/env node
'use strict';

function City() {
  this.position = { x: 0, y: 0 };
  this.direction = 'N';
}

// clockwise directions
City.prototype.DIRECTIONS = Object.seal(['N', 'E', 'S', 'W']);

// turn left or right and update direction
City.prototype.turn = function (side) {
  var index = this.DIRECTIONS.indexOf(this.direction);
  if (side === 'L') {
    // `index+3` is equivalent to `index-1`, but overflows are easier to deal with
    index = (index + 3) % 4;
  } else if (side === 'R') {
    index = (index + 1) % 4;
  }
  this.direction = this.DIRECTIONS[index];
};

// move block position in current direction
City.prototype.move = function (blocks) {
  this.position.y += this.direction === 'N' ? blocks : this.direction === 'S' ? -1 * blocks : 0;
  this.position.x += this.direction === 'E' ? blocks : this.direction === 'W' ? -1 * blocks : 0;
};

// follow steps
City.prototype.walk = function (steps) {
  steps.forEach(step => {
    const match = step.match(/(L|R)(\d+)/);
    this.turn(match[1]);
    this.move(parseInt(match[2]));
  });
};

// follow steps until first repeated location
City.prototype.walkUntilRepeat = function (steps) {
  const grid = Object.create(null);
  let stop = false;

  // save initial position
  grid[`${this.position.x} ${this.position.y}`] = true;

  for (let i = 0; i < steps.length && !stop; i++) {
    const match = steps[i].match(/(L|R)(\d+)/);
    const side = match[1];
    const length = parseInt(match[2]);

    this.turn(side);
    for (let j = 0; j < length && !stop; j++) {
      this.move(1);
      const positionKey = `${this.position.x} ${this.position.y}`;
      stop = grid[positionKey]; // stop if position already known
      grid[positionKey] = true;
    }
  }
};

// get city block distance
const countBlocks = steps => {
  var city = new City();
  city.walk(steps);
  return Math.abs(city.position.x) + Math.abs(city.position.y);
};

// get city block distance until first repeated location
const countBlocksUntilRepeat = steps => {
  var city = new City();
  city.walkUntilRepeat(steps);
  return Math.abs(city.position.x) + Math.abs(city.position.y);
};

/* istanbul ignore next */
const run = () => {
  const input = require('path').resolve(__dirname, 'day1.input.txt');
  const data = require('fs').readFileSync(input, 'utf-8').match(/(L|R)\d+/g) || [];
  console.log('Day 1:', countBlocks(data), countBlocksUntilRepeat(data));
};

/* istanbul ignore next */
if (require.main === module) {
  run();
}

module.exports = { countBlocks, countBlocksUntilRepeat, run };
