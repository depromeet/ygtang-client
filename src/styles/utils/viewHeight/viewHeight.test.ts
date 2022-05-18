import { fullViewHeight, viewHeight } from './viewHeight';

describe('styles/utils/viewHeight', () => {
  it('should defined viewHeight', () => {
    expect(viewHeight).toBeDefined();
  });

  it('should return correct viewHeight value from viewHeight util', () => {
    const viewHeightValue = 50;
    const result = viewHeight(viewHeightValue);
    expect(result.includes(viewHeightValue.toString())).toBeTruthy();
  });

  it('should defined fullViewHeight', () => {
    expect(fullViewHeight).toBeDefined();
  });

  it('should return 100 viewHeight from fullViewHeight util', () => {
    const result = fullViewHeight();
    expect(result.includes('100')).toBeTruthy();
  });
});
