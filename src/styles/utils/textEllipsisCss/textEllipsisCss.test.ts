import { textEllipsisCss } from './textEllipsisCss';

const CSS_ATTRIBUTE = '-webkit-line-clamp';

describe('styles/utils/textEllipsisCss', () => {
  it('should defined', () => {
    expect(textEllipsisCss).toBeDefined();
  });

  // deprecated getStyleValueFromSerializedStyles
  // TODO: migration to vitest
  // it('should return correct line clamp value', () => {
  //   const expectNumber = 1;
  //   const result = textEllipsisCss(expectNumber);
  //   const lineClampValue = getStyleValueFromSerializedStyles(result, CSS_ATTRIBUTE);
  //   console.log(result);
  //   expect(lineClampValue).toBe(expectNumber.toString());
  // });
});
