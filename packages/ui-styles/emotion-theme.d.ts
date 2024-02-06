import type { Theme as YgtangTheme } from "./src/Theme/Theme";

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends YgtangTheme {}
}
