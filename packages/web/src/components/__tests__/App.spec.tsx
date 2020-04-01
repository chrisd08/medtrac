import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, wait } from "../../testing/__utils";
import App from "../App";

describe("App", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await wait();
  });
});
