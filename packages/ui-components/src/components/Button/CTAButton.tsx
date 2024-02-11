import { ComponentProps } from "react";
import { css } from "@emotion/react";
import { YgtangTheme } from "@ygtang/ui-styles";

import { Button } from "./Button";

interface CTAButtonProps extends ComponentProps<typeof Button> {}

export function CTAButton(props: CTAButtonProps) {
  const { children, ...rest } = props;

  return (
    <Button css={ctaButtonCss} {...rest}>
      {children}
    </Button>
  );
}

const ctaButtonCss = (theme: YgtangTheme) => css`
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
