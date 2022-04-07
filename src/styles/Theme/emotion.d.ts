import CustomTheme from './Theme';

import '@emotion/react';

type CustomThemeType = typeof CustomTheme;

declare module '@emotion/react' {
  export interface Theme extends CustomThemeType {}
}
