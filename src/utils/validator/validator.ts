type ValidatorType = 'email' | 'url' | 'exactUrl';

const pattern: Record<ValidatorType, RegExp> = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,9}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/g,
  exactUrl:
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,9}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/g,
};

interface PropsWithType {
  /**
   * value 유효성을 체크할 값입니다.
   */
  value: string;
  /**
   * type 유효성 판단 타입을 적습니다.
   */
  type: ValidatorType;
}

interface PropsWithRegex {
  /**
   * value 유효성을 체크할 값입니다.
   */
  value: string;
  /**
   * 유효성을 판단할 정규식을 직접 넣습니다.
   */
  rule: RegExp;
}

export function validator(props: PropsWithType): boolean;
export function validator(props: PropsWithRegex): boolean;

export function validator(props: PropsWithType | PropsWithRegex) {
  if ('rule' in props) {
    return typeof props.value === 'string' && Boolean(props.value.match(props.rule));
  }

  return typeof props.value === 'string' && Boolean(props.value.match(pattern[props.type]));
}
