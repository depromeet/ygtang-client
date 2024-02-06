import { useTheme as useEmotionTheme } from "@emotion/react";

import { Theme } from "./Theme";

export function useTheme() {
  const theme = useEmotionTheme();
  return theme as Theme;
}
