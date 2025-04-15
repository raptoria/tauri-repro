import { App } from "@/app/main/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "overmind-react";
import { createOvermind } from "overmind";
import { config } from "@/overmind";
const overmind = createOvermind(config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>
);
