import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { useUserAgent } from '~/hooks/common/useUserAgent';

import { CTAButton } from './CTAButton';

interface CTABottomButtonProps extends ComponentProps<typeof CTAButton> {}

export function CTABottomButton(props: CTABottomButtonProps) {
  const { isIos } = useUserAgent();
  const theme = useTheme();
  const { children, ...rest } = props;

  return (
    <div css={ctaBottomButtonCss(isIos(), theme)}>
      <CTAButton {...rest}>{children}</CTAButton>
    </div>
  );
}

const ctaBottomButtonCss = (isIos: boolean, theme: Theme) => css`
  padding: ${isIos ? `8px 0 0 0` : `8px 0`};
  background: ${theme.color.background};
`;
