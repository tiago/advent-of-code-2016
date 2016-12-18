'use strict';

const expect = require('chai').expect;
const day1 = require('./day1');

describe('day 1', () => {
  describe('#countBlocks', () => {
    it('should return distance in city block distance', () => {
      expect(day1.countBlocks(['R2', 'L3'])).to.equal(5);
      expect(day1.countBlocks(['R2', 'R2', 'R2'])).to.equal(2);
      expect(day1.countBlocks(['R5', 'L5', 'R5', 'R3'])).to.equal(12);
    });
  });
});