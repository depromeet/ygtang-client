import React from "react";
import { createRoot } from "react-dom/client";

import Popup from "./Popup";

import "./index.css";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
