import React from "react";
import { render } from "@testing-library/react";
import { AppContextProvider } from "./context";

const ProvidersWrapper = ({ children }) => (
  <AppContextProvider>{children}</AppContextProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: ProvidersWrapper, ...options });

export { customRender as render };
