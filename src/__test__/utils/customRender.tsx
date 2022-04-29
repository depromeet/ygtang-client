import { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';

import Theme from '~/styles/Theme';

function RenderWithAllProviders({ children }: PropsWithChildren<unknown>) {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}

export function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: RenderWithAllProviders, ...options });
}
