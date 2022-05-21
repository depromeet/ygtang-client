import * as ga from './index';

describe('libs/ga/index', () => {
  it('should defined', () => {
    expect(ga).toBeDefined();
    expect(ga.gaPageview).toBeDefined();
    expect(ga.gaEvent).toBeDefined();
  });
});
