type ValidatorType = 'email' | 'url';

interface Validator {
  /**
   * value 유효성을 체크할 값입니다.
   */
  value: string;

  /**
   * type 유효성 판단 타입을 적습니다.
   */
  type?: ValidatorType;

  /**
   * 유효성을 판단할 정규식을 직접 넣습니다.
   */
  rule?: RegExp;
}

const pattern: Record<ValidatorType, RegExp> = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
};

export const validator = ({ value, type, rule }: Validator) => {
  if (rule) {
    return typeof value === 'string' && Boolean(value.match(rule));
  }

  if (type) {
    return typeof value === 'string' && Boolean(value.match(pattern[type]));
  }

  return false;
};
