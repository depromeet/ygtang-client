import { fullViewHeight, viewHeight } from './index';

describe('styles/utils/viewHeight/index', () => {
  it('should defined viewHeight', () => {
    expect(viewHeight).toBeDefined();
  });

  it('should defined fullViewHeight', () => {
    expect(fullViewHeight).toBeDefined();
  });
});
