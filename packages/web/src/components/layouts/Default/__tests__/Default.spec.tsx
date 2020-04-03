import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { MemoryRouter } from "react-router";
import { Default } from "..";
import {
  createMatchMedia,
  fireEvent,
  render,
  RenderResult,
  waitForElement,
  waitForElementToBeRemoved,
} from "../../../../testing";
import theme from "../../../../theme";

const renderDefault = (): RenderResult =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Default>test</Default>
      </ThemeProvider>
    </MemoryRouter>
  );

describe("default layout", () => {
  it("renders passed child component", async () => {
    const { getByText } = renderDefault();
    expect(getByText("test")).toBeInTheDocument();
  });

  describe("on desktop", () => {
    beforeAll(() => {
      window.matchMedia = createMatchMedia(1920);
    });

    it("shows the sidebar", () => {
      const { getByTestId } = renderDefault();
      const sidebar = getByTestId("sidebar-drawer");
      expect(sidebar).toBeInTheDocument();
    });
  });

  describe("on mobile", () => {
    beforeAll(() => {
      window.matchMedia = createMatchMedia(1024);
    });

    it("doesn't show the sidebar", () => {
      const { queryByTestId } = renderDefault();
      expect(queryByTestId("sidebar-drawer")).not.toBeInTheDocument();
    });

    it("allows the sidebar to be opened and closed", async () => {
      const { getByTestId, getByTitle } = renderDefault();
      const button = getByTitle("Open sidebar");
      fireEvent.click(button);
      const sidebar = await waitForElement(() => getByTestId("sidebar-drawer"));
      fireEvent.click(sidebar.firstElementChild as Element);
      await waitForElementToBeRemoved(() => getByTestId("sidebar-drawer"));
    });
  });
});
