import { ReactElement } from "react";
import { css } from "@emotion/react";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import logo from "../../assets/img/logo.svg";

interface NavigationBarBaseProps {
  title?: string;
  rightElement?: ReactElement;
}

export default function NavigationBar(props: NavigationBarBaseProps) {
  const { title, rightElement } = props;
  const theme = useTheme();

  return (
    <nav css={navCss(theme)}>
      {title && (
        <h1 css={headingCss(theme)}>
          <img src={logo} />
          {title}
        </h1>
      )}
      {rightElement && <>{rightElement}</>}
    </nav>
  );
}

const navCss = (theme: YgtangTheme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  height: 56px;
  background-color: ${theme.color.background};

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 900;
`;

const headingCss = (theme: YgtangTheme) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${theme.color.gray05};
  font-size: 1rem;

  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;
