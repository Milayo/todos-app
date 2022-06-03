import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <ToastContainer limit={2} />
  </StrictMode>
);
