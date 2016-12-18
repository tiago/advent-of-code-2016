#! /usr/bin/env node
'use strict';

const countBlocks = instructions => {
  let x = 0;
  let y = 0;
  const directions = ['N', 'E', 'S', 'W'];
  let index = 0;
  let direction;

  const orient = (turn) => {
    if (turn === 'L') {
      index = (index + 3 ) % 4;
    } else if (turn === 'R') {
      index = (index + 1 ) % 4;
    }
    direction = directions[index];
  };

  instructions.forEach(instruction => {
    const match = instruction.match(/(L|R)(\d+)/);
    const turn = match[1];
    const steps = parseInt(match[2]);
    orient(turn);
    y += direction === 'N' ? steps : direction === 'S' ? -1 * steps : 0;
    x += direction === 'E' ? steps : direction === 'W' ? -1 * steps : 0;
  });

  return Math.abs(x + y);
};

/* istanbul ignore next */
const run = () => {
  const input = require('path').resolve(__dirname, 'day1.input.txt');
  const data = require('fs').readFileSync(input, 'utf-8').match(/(L|R)\d+/g) || [];
  console.log('Day 1:', countBlocks(data));
};

/* istanbul ignore next */
if (require.main === module) {
  run();
}

module.exports = { countBlocks, run };
