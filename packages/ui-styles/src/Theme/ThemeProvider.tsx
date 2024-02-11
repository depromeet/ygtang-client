import { PropsWithChildren } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import { GlobalStyle } from "../GlobalStyle";
import { theme } from ".";

export function ThemeProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <EmotionThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </EmotionThemeProvider>
  );
}
