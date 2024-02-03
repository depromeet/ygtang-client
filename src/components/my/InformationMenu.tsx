import { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';

import { textEllipsisCss } from '~/styles/utils';

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
    <li css={wrapperCss(align)}>
      <div css={informationCss}>
        <span css={labelCss}>{label}</span>
        <span css={descriptionCss}>{description}</span>
      </div>
      {rightElement && <>{rightElement}</>}
    </li>
  );
}

const wrapperCss = (align: MyInformationAlignType) => (theme: Theme) => css`
  display: flex;
  align-items: ${align === 'top' ? 'flex-start' : 'flex-end'};
  height: 78px;
  padding: 16px 0;
  border-bottom: solid 1px ${theme.color.gray01};
`;
const informationCss = css`
  flex: 1;
  padding-right: 14px;
  display: flex;
  flex-direction: column;
`;
const labelCss = css`
  font-size: 16px;
  line-height: 150%;
  ${textEllipsisCss(1)}
`;
const descriptionCss = (theme: Theme) => css`
  font-size: 14px;
  font-weight: ${theme.font.weight.medium};
  line-height: 150%;
  color: ${theme.color.gray04};
  ${textEllipsisCss(1)}
`;
