import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@ygtang/api";
import { ThemeProvider } from "@ygtang/ui-styles";

import { PopupApp } from "./App";

const Popup = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PopupApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Popup;
