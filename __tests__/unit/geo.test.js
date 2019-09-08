const { getDistance } = require('../../app/geo');

describe('geolocation', () => {
  it('should return 0 if is the same location', () => {
    const distance = getDistance(
      process.env.OFFICE_LAT,
      process.env.OFFICE_LNG
    );
    expect(distance).toBe(0);
  });

  it('should be around 41', () => {
    const distance = getDistance('52.986375', '-6.043701');
    expect(distance).toBeCloseTo(41.768);
  });
});
