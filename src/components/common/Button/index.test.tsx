import Button from './Button';
import Default, {
  CTABottomButton,
  CTAButton,
  FilledButton,
  GhostButton,
  IconButton,
} from './index';

describe('components/common/Button/index', () => {
  it('default export가 선언되어 있으며 Button 태그여야 함', () => {
    expect(Default).toBeDefined();
    expect(Button).toBeDefined();
    expect(Default).toBe(Button);
  });

  it('이 외에 named export 되어 있어야함', () => {
    expect(CTABottomButton).toBeDefined();
    expect(CTAButton).toBeDefined();
    expect(FilledButton).toBeDefined();
    expect(GhostButton).toBeDefined();
    expect(IconButton).toBeDefined();
  });
});
