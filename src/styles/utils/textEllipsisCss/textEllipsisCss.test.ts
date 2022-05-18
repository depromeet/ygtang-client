import { getStyleValueFromSerializedStyles } from '~/__test__/utils';

import { textEllipsisCss } from './textEllipsisCss';

const CSS_ATTRIBUTE = '-webkit-line-clamp';

describe('styles/utils/textEllipsisCss', () => {
  it('should defined', () => {
    expect(textEllipsisCss).toBeDefined();
  });

  it('should return correct line clamp value', () => {
    const expectNumber = 1;
    const result = textEllipsisCss(expectNumber);
    const lineClampValue = getStyleValueFromSerializedStyles(result, CSS_ATTRIBUTE);
    expect(lineClampValue).toBe(expectNumber.toString());
  });
});
