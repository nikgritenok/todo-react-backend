import { createRoot } from "react-dom/client";
import { store } from "./store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./styles/index.scss";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
