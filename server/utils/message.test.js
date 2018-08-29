const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should return correct message object', () => {
      const [from, text] = ['Rabi', 'Cool mocha test'];
      const message = generateMessage(from, text);
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);
      expect(message).toMatchObject({ from, text, })
      expect(typeof generateMessage(from, text).createdAt).toBe('number');
        
  });
});