import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

export interface UseInputHookType {
  /**
   * input state가 initializing 될 때 넣을 값입니다.
   *
   * @default ''
   */
  initialValue?: string;

  /**
   * debounce 효과를 사용할 것인지 정의합니다.
   *
   * @default `false`
   */
  useDebounce?: boolean;

  /**
   * debounce 효과를 사용할 때의 timeout 시간입니다. (단위: ms)
   *
   * @default `150`
   */
  debounceTimeout?: number;
}

type InputAcceptType = string;

export default function useInput({
  initialValue,
  useDebounce = false,
  debounceTimeout = 150,
}: UseInputHookType) {
  const [value, setValue] = useState<InputAcceptType>(initialValue ?? '');
  const [debouncedValue, setDebouncedValue] = useState<InputAcceptType>(initialValue ?? '');

  const handleSetDebounceValue = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedValue(value);
      }, debounceTimeout),
    [debounceTimeout]
  );

  const handleSetValue = useCallback(
    (value: InputAcceptType) => {
      setValue(value);
      if (useDebounce) {
        handleSetDebounceValue(value);
      }
    },
    [handleSetDebounceValue, useDebounce]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      handleSetValue(event.target.value);
    },
    [handleSetValue]
  );

  return {
    value,

    setValue: handleSetValue,

    /**
     * input 요소의 onChange 를 처리하는 함수입니다.
     *
     * ```js
     * <input value={...} onChange={onChange} />
     * ```
     */
    onChange,

    /**
     * value를 debounce한 string입니다.
     *
     * `useDebounce`가 `true`로 설정되어 있어야 작동합니다.
     */
    debouncedValue,
  };
}
