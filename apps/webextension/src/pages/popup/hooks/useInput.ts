import { ChangeEvent, useCallback, useState } from "react";

export interface UseInputHookType {
  /**
   * input state가 initializing 될 때 넣을 값입니다.
   *
   * @default ''
   */
  initialValue?: string;
}

type InputAcceptType = string;

export default function useInput({ initialValue }: UseInputHookType) {
  const [value, setValue] = useState<InputAcceptType>(initialValue ?? "");

  const onChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValue(event.target.value);
    },
    []
  );

  return {
    value,

    setValue,

    /**
     * input 요소의 onChange 를 처리하는 함수입니다.
     *
     * ```js
     * <input value={...} onChange={onChange} />
     * ```
     */
    onChange,
  };
}
