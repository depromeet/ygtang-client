import { css, Theme } from '@emotion/react';

import { Checkbox } from '~/components/common/CheckList';
import { InspirationKindFilterType } from '~/store/InspirationKindFilter/inpirationKindFilter';
import { useInspirationKindFilter } from '~/store/InspirationKindFilter/useInspirationKindFilter';
import { recordEvent } from '~/utils/analytics';

export default function InspirationKindSection() {
  return (
    <section css={inspirationKindSectionCss}>
      <span css={spanCss}>영감 종류</span>
      <div css={buttonWrapperCss}>
        <CheckboxButton text="전체" value={null} />
        <div css={spanDividerCss}></div>
        <CheckboxButton text="이미지" value={'IMAGE'} />
        <CheckboxButton text="글" value={'TEXT'} />
        <CheckboxButton text="링크" value={'LINK'} />
      </div>
    </section>
  );
}

const inspirationKindSectionCss = (theme: Theme) => css`
  color: ${theme.color.gray05};
  margin-bottom: 30px;
`;

const spanCss = css`
  display: block;
  margin-bottom: 8px;
`;

const buttonWrapperCss = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  height: 36px;
`;

const spanDividerCss = css`
  height: 80%;
  width: 2px;
  background-color: rgb(163, 179, 186);
  border-radius: 12px;
`;

interface CheckboxButtonProps {
  text: string;
  value: InspirationKindFilterType;
}

function CheckboxButton({ text, value }: CheckboxButtonProps) {
  const { inspirationKindFilter, setInspirationKindFilter } = useInspirationKindFilter();

  const onClickButton = () => {
    setInspirationKindFilter(value);
    recordEvent({ action: '영감 종류 필터링', value: text });
  };

  return (
    <button onClick={onClickButton} css={buttonCss}>
      <Checkbox isChecked={value === inspirationKindFilter} onToggle={() => {}} />
      {text}
    </button>
  );
}

const buttonCss = (theme: Theme) => css`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 6px;
  padding: 0;
  color: ${theme.color.gray05};

  /* NOTE: Check Icon 상하 가운데 정렬 */
  & label {
    display: flex;
    align-items: center;
  }
`;
