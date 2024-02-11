import { ComponentProps } from "react";
import { css } from "@emotion/react";
import { useUserAgent } from "@ygtang/hooks";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import { CTAButton } from "./CTAButton";

interface CTABottomButtonProps extends ComponentProps<typeof CTAButton> {
  children?: React.ReactNode;
}

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

const ctaBottomButtonCss = ({
  theme,
  isIos,
}: {
  theme: YgtangTheme;
  isIos: boolean;
}) => css`
  padding: ${isIos ? `8px 0 0 0` : `8px 0`};
  background: ${theme.color.background};
`;
