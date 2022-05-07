import { ComponentProps } from 'react';
import { css, Theme } from '@emotion/react';

import { CTAButton } from './CTAButton';

interface CTABottomButtonProps extends ComponentProps<typeof CTAButton> {}

export function CTABottomButton(props: CTABottomButtonProps) {
  const { children, ...rest } = props;

  return (
    <CTAButton css={ctaButtonCss} {...rest}>
      {children}
    </CTAButton>
  );
}

const ctaButtonCss = (theme: Theme) => css`
  width: 100%;
  height: 56px;
  font-size: 16px;
  font-weight: ${theme.font.weight.semiBold};
  color: ${theme.color.background};
  background-color: ${theme.color.primary};

  &:disabled {
    background-color: ${theme.color.primary_disabled};
  }
`;
