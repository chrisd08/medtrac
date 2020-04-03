import React from "react";
import { MemoryRouter } from "react-router";
import { AuthInterface } from "../../../../services/auth";
import {
  createAuthMock,
  fireEvent,
  render,
  RenderResult,
  waitForElement,
} from "../../../../testing";
import { AuthProvider } from "../../../providers/AuthProvider";
import { NavBar } from "../NavBar";

const renderNavBar = (
  loggedIn: boolean
): RenderResult & { authMock: jest.Mocked<AuthInterface> } => {
  const authMock = createAuthMock(loggedIn);
  return {
    authMock,
    ...render(
      <MemoryRouter>
        <AuthProvider auth={authMock}>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>
    ),
  };
};

describe("Navigation bar component", () => {
  describe("when not logged in", () => {
    it("renders the correct buttons", async () => {
      const { authMock, getByText, queryByText } = renderNavBar(false);
      const loginButton = await waitForElement(() => getByText(/Log in/));
      expect(queryByText(/Log out/)).not.toBeInTheDocument();
      fireEvent.click(loginButton);
      expect(authMock.login).toHaveBeenCalled();
    });
  });

  describe("when logged in", () => {
    it("renders the correct buttons", async () => {
      const { authMock, getByText, queryByText } = renderNavBar(true);
      const logoutButton = await waitForElement(() => getByText(/Log out/));
      expect(queryByText(/Log in/)).not.toBeInTheDocument();
      fireEvent.click(logoutButton);
      expect(authMock.logout).toHaveBeenCalled();
    });

    it("renders the navigation links", async () => {
      const { getByText } = renderNavBar(true);
      await waitForElement(() => getByText(/Dashboard/));
    });
  });
});
