import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { MemoryRouter } from "react-router";
import { Topbar } from "..";
import {
  createMatchMedia,
  fireEvent,
  render,
  RenderResult,
} from "../../../../testing";
import theme from "../../../../theme";

const renderTopBar = (): RenderResult & { onSidebarOpenSpy: jest.Mock } => {
  const onSidebarOpenSpy = jest.fn();
  return {
    onSidebarOpenSpy,
    ...render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Topbar onSidebarOpen={onSidebarOpenSpy} />
        </ThemeProvider>
      </MemoryRouter>
    ),
  };
};

describe("Top bar component", () => {
  it("renders a logo image with a link to the homepage", () => {
    const { getByAltText } = renderTopBar();
    const logo = getByAltText("Logo");
    expect(logo.parentElement?.getAttribute("href")).toBe("/");
  });

  describe("on desktop", () => {
    beforeAll(() => {
      window.matchMedia = createMatchMedia(1920);
    });

    it("renders the notifications and sign out buttons", () => {
      const { getByTitle } = renderTopBar();
      expect(getByTitle("Notifications")).toBeInTheDocument();
      expect(getByTitle("Sign out")).toBeInTheDocument();
    });
  });

  describe("on mobile", () => {
    beforeAll(() => {
      window.matchMedia = createMatchMedia(1024);
    });

    it("renders the open sidebar button", () => {
      const { getByTitle, onSidebarOpenSpy } = renderTopBar();
      const openSidebarButton = getByTitle("Open sidebar");
      fireEvent.click(openSidebarButton);
      expect(onSidebarOpenSpy).toHaveBeenCalled();
    });
  });
});
