import { createRoot } from "react-dom/client";

import App from "./app";

const root = document.createElement("div");
root.id = "ygtang-extension-root";
document.body.append(root);

createRoot(root).render(<App />);
