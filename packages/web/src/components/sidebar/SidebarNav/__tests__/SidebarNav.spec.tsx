import { ThemeProvider } from "@material-ui/core";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { SidebarNav } from "..";
import { Page } from "../..";
import { fireEvent, render, RenderResult } from "../../../../testing";
import theme from "../../../../theme";

const pages: Page[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <div>dashboard icon</div>,
  },
  {
    title: "Users",
    href: "/users",
    icon: <div>users icon</div>,
  },
];

const renderSidebarNav = (history: MemoryHistory): RenderResult => {
  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <SidebarNav pages={pages} />
      </ThemeProvider>
    </Router>
  );
};

describe("SidebarNav component", () => {
  it("renders page links correctly", () => {
    const history = createMemoryHistory();
    const { getAllByRole, getByText } = renderSidebarNav(history);
    const [dashboardLink, usersLink] = getAllByRole("button");
    getByText("dashboard icon");
    getByText("users icon");
    fireEvent.click(dashboardLink);
    expect(history.location.pathname).toBe("/dashboard");
    fireEvent.click(usersLink);
    expect(history.location.pathname).toBe("/users");
  });
});
