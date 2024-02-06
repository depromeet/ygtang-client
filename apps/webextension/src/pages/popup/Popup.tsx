import { QueryClientProvider } from "@tanstack/react-query";

import { YgtThemeProvider } from "@src/styles/Theme/YgtThemeProvider";

import { queryClient } from "@src/libs/api/queryClient";
import { PopupApp } from "./App";

const Popup = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <YgtThemeProvider>
        <PopupApp />
      </YgtThemeProvider>
    </QueryClientProvider>
  );
};

export default Popup;
