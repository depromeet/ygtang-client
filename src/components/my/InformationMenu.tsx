import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';

export type MyInformationAlignType = 'top' | 'bottom';

export interface MyInformationProps {
  label: string;
  description: string;
  rightElement?: ReactNode;
  /**
   * rightElement가 flex-start || flex-end 위치할 수 있도록하기 위해 사용됩니다.
   */
  align?: MyInformationAlignType;
}

export default function MyInformationMenu({
  label,
  description,
  rightElement,
  align = 'top',
}: MyInformationProps) {
  return (
    <div css={wrapperCss(align)}>
      <div css={informationCss}>
        <span css={labelCss}>{label}</span>
        <span css={descriptionCss}>{description}</span>
      </div>
      {rightElement && rightElement}
    </div>
  );
}

const descriptionCss = (theme: Theme) => css`
  font-size: 14px;
  line-height: 150%;
  color: ${theme.color.gray04};
`;

const wrapperCss = (align: MyInformationAlignType) => (theme: Theme) =>
  css`
    display: flex;
    align-items: ${align === 'top' ? 'flex-start' : 'flex-end'};
    flex: 1;
    padding: 16px 14px 16px 16px;
    border-bottom: solid 1px ${theme.color.gray01};
  `;
const informationCss = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const labelCss = css`
  font-size: 16px;
  line-height: 150%;
`;
