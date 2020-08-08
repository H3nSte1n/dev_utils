import { measureMethodPerfOnCall } from '../../src/decorator/measureMethodPerfOnCall';
import { expect } from 'chai';
import sinon from 'sinon';

before(() => {
  // fake console.log method
  console.log = () => true;
})
after(() => {
  //reset console.log
  delete console.log;
})

describe('PerformanceMethodByCall', () => {
  class Person {
    @measureMethodPerfOnCall()
    public calc(foo?: string, foobar?: string) {
      return 300 * 300;
    }
  }

  describe('should return console.log on method call', () => {
    it('without arguments.', () => {
      const log = sinon.spy(console, 'log');
      new Person().calc();
      new Person().calc();
      sinon.assert.calledTwice(log);
      log.restore();
    });

    it('with arguments.', () => {
      const log = sinon.spy(console, 'log');
      new Person().calc("foo");
      new Person().calc("foo", "foobar");
      sinon.assert.calledTwice(log);
      log.restore();
    });
  });
  it('should not call console.log by method initialisation.', () => {
    const log = sinon.spy(console, 'log');
    sinon.assert.notCalled(log);
    log.restore();
  });
  describe('should output return value of method', () => {
    it('without arguments', () => {
      const result = new Person().calc();
      expect(result).equal(90000);
    });
    it('with arguments', () => {
      const result = new Person().calc("foo", "foobar");
      expect(result).equal(90000);
    });
  });
});
