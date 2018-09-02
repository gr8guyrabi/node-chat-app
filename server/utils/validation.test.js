const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let name = 2342342342;
    let room = 'bonus';
    expect(isRealString(name)).toBeFalsy();
    expect(isRealString(room)).toBeTruthy();
  });

  it('should return strings with only spaces', () => {
    let name = 'rabi';
    let room = '       ';
    expect(isRealString(name)).toBeTruthy();
    expect(isRealString(room)).toBeFalsy();
  });

  it('should allow strings with non-space characters', () => {
    let name = '      rabi         ';
    let room = 'bonus';
    expect(isRealString(name)).toBeTruthy();
    expect(isRealString(room)).toBeTruthy();
  });
});