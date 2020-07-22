import RandomInteger from '../index';

const ri = new RandomInteger();

expect.extend({
    toBeInteger(received) {
      if (Number.isInteger(received)) {
        return {
          message: () =>
            `expected ${received} not to be integer`,
          pass: true,
        }
      } else {
        return {
          message: () => 
            `expected ${received} to be integer`,
          pass: false
        };
      }
    },
});

test('should return 1 to 10 integer if the value "1 10 10" is passed',  () => {
    expect(Math.max(...ri.create(1, 10, 10))).toBeLessThanOrEqual(10)
    expect(Math.min(...ri.create(1, 10, 10))).toBeGreaterThanOrEqual(1)
    expect(ri.create(1, 10, 1)[0]).toBeInteger()
})

test('should return -10 to 0 integer if the value "-10 0 10" is passed',  () => {
    expect(Math.max(...ri.create(-10, 1, 10))).toBeLessThanOrEqual(1)
    expect(Math.min(...ri.create(-10, 1, 10))).toBeGreaterThanOrEqual(-10)
    expect(ri.create(-10, 0, 10)[0]).toBeInteger()
})

test('should return 1 if the value "1 1 10" is passed',  () => {
    expect(ri.create(1, 1, 1)[0]).toBe(1)
})

test('should return array of length 100 if the value "1 10 10" is passed', () => {
    expect(ri.create(1, 10, 100).length).toBe(100)
})