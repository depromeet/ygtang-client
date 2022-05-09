import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { useUserAgent } from '~/hooks/common/useUserAgent';

import { CTAButton } from './CTAButton';

interface CTABottomButtonProps extends ComponentProps<typeof CTAButton> {}

export function CTABottomButton(props: CTABottomButtonProps) {
  const { children, ...rest } = props;
  const { isIos } = useUserAgent();
  const theme = useTheme();

  return (
    <div css={ctaBottomButtonCss({ theme, isIos: isIos() })}>
      <CTAButton {...rest}>{children}</CTAButton>
    </div>
  );
}

const ctaBottomButtonCss = ({ theme, isIos }: { theme: Theme; isIos: boolean }) => css`
  padding: ${isIos ? `8px 0 0 0` : `8px 0`};
  background: ${theme.color.background};
`;
