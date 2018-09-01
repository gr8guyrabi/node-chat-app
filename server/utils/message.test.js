const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should return correct message object', () => {
      const [from, text] = ['Rabi', 'Cool mocha test'];
      const message = generateMessage(from, text);
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);
      expect(message).toMatchObject({ from, text, })
      expect(typeof message.createdAt).toBe('number');
        
  });
});

describe('generateLocationMessage', () => {
  it('should return correct location message object', () => {
    const [from, latitude, longitude] = ['Admin', 27.635845999999997, 85.341071];
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const locationMessage = generateLocationMessage(from, latitude, longitude);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(url);
    expect(locationMessage).toMatchObject({ from, url });
    expect(typeof locationMessage.createdAt).toBe('number');
  });
});