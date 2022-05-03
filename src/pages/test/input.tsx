import { css } from '@emotion/react';

import { SearchIcon } from '~/components/common/icons';
import TextField from '~/components/common/TextField';
import useInput from '~/hooks/common/useInput';
import theme from '~/styles/Theme';

export default function InputTest() {
  const { value, debouncedValue, onChange } = useInput({ useDebounce: true });

  return (
    <>
      <TextField
        label={'원하는 값을 입력하세요 (debounced)'}
        value={value}
        onChange={onChange}
        placeholder={'검색'}
        feedback={debouncedValue}
        preAppend={
          <div
            css={css`
              padding: 1px;
              color: ${theme.color.gray04};
            `}
          >
            <SearchIcon size={24} />
          </div>
        }
        isSuccess
      />
    </>
  );
}
