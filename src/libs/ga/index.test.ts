import { gaEvent, gaPageview } from './index';

describe('libs/ga/index', () => {
  it('should defined', () => {
    expect(gaPageview).toBeDefined();
    expect(gaEvent).toBeDefined();
  });
});
