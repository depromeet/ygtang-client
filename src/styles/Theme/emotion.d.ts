import '@emotion/react';

import CustomTheme from './Theme';

type CustomThemeType = typeof CustomTheme;

declare module '@emotion/react' {
  export interface Theme extends CustomThemeType {}
}
