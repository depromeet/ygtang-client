import { validator } from './validator';

describe('utils/validator/validator', () => {
  it('should defined', () => {
    expect(validator).toBeDefined();
  });

  it('should use with regex', () => {
    const regex = /^[a-z0-9]{6}$/;
    const result = validator({ value: 'abcdef', rule: regex });

    expect(result).toBe(true);
  });

  it('should use with email type', () => {
    const correctResult = validator({ type: 'email', value: 'foo@email.com' });

    expect(correctResult).toBe(true);

    const incorrectResult = validator({
      type: 'email',
      value: 'foo@@email.com',
    });

    expect(incorrectResult).toBe(false);
  });

  it('should use with url type', () => {
    const noSubdomain = validator({ type: 'url', value: 'https://foo.com' });
    expect(noSubdomain).toBe(true);
    const withSubdomain = validator({ type: 'url', value: 'https://www.foo.com' });
    expect(withSubdomain).toBe(true);

    const notUrl = validator({ type: 'url', value: 'foo' });
    expect(notUrl).toBe(false);
  });

  it('should use with exact url type', () => {
    const noSubdomain = validator({ type: 'exactUrl', value: 'https://foo.com' });
    expect(noSubdomain).toBe(true);
    const withSubdomain = validator({ type: 'exactUrl', value: 'https://www.foo.com' });
    expect(withSubdomain).toBe(true);

    const notUrl = validator({ type: 'exactUrl', value: 'foo' });
    expect(notUrl).toBe(false);
  });
});
