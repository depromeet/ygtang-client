import { ComponentProps } from "react";
import { css } from "@emotion/react";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import { Button } from "./Button";

type SizeType = "large" | "medium" | "small";

interface GhostButtonProps extends ComponentProps<typeof Button> {
  size?: SizeType;
}

export function GhostButton(props: GhostButtonProps) {
  const { size = "large", children, ...rest } = props;
  const theme = useTheme();

  return (
    <Button css={ghostButtonCss(theme, size)} {...rest}>
      {children}
    </Button>
  );
}

const ghostButtonCss = (theme: YgtangTheme, size: SizeType) => css`
  ${size === "large" && largeCss};
  ${size === "medium" && mediumCss};
  ${size === "small" && smallCss};

  color: ${theme.color.gray05};
  background-color: inherit;
  font-weight: ${theme.font.weight.semiBold};
`;

const largeCss = css`
  font-size: 15px;
  padding: 10px 8px;
  height: 40px;
`;

const mediumCss = css`
  font-size: 12px;
  padding: 8px;
  height: 34px;
`;

const smallCss = css`
  font-size: 10px;
  padding: 0px 2px;
  height: 15px;
`;
