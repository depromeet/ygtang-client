import { Indicator, SnapCarousel } from './index';

describe('components/common/SnapCarousel/index', () => {
  it('should defined Indicator', () => {
    expect(Indicator).toBeDefined();
  });

  it('should defined SnapCarousel', () => {
    expect(SnapCarousel).toBeDefined();
    expect(SnapCarousel.Wrapper).toBeDefined();
    expect(SnapCarousel.Item).toBeDefined();
  });
});
