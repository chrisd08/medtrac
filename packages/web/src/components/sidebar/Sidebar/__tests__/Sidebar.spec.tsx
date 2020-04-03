import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { MemoryRouter } from "react-router";
import { render, RenderResult } from "../../../../testing";
import theme from "../../../../theme";
import { Sidebar } from "../Sidebar";

const renderSidebar = (): RenderResult => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Sidebar open variant={"temporary"} onClose={jest.fn()} />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("Sidebar component", () => {
  it("renders correctly", () => {
    const { getByText } = renderSidebar();
    expect(getByText(/Shen Zhi/)).toBeInTheDocument();
    expect(getByText(/Users/)).toBeInTheDocument();
  });
});
