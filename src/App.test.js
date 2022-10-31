import { render } from "@testing-library/react";
import { server } from "./mocks/server.js";
import App from "./App";

describe("<App />", () => {
  afterEach(() => server.resetHandlers());
  it("should render", () => {
    render(<App />);
  });
});
