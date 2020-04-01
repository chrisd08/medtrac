import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { MemoryRouter } from "react-router";
import { Default } from "..";
import { render } from "../../../../testing";
import theme from "../../../../theme";

describe("default layout", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Default />
        </ThemeProvider>
      </MemoryRouter>
    );
  });
});
