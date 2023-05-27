import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import "../src/index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
