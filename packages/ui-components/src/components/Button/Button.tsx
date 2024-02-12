import { ButtonHTMLAttributes } from "react";
import { css } from "@emotion/react";
import type { YgtangTheme } from "@ygtang/ui-styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  return (
    <button css={buttonCss} {...rest}>
      {children}
    </button>
  );
}

const buttonCss = (theme: YgtangTheme) => css`
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.default};
  color: ${theme.color.background};
  background-color: ${theme.color.gray05};
  font-size: 12px;
  height: 26px;
`;
