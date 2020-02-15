import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("App", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
        container
      );
    });
  });
});
