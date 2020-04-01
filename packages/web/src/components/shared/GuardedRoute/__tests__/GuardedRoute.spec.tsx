import { cleanup } from "@testing-library/react";
import React from "react";
import { GuardedRoute } from "..";
import {
  createAuthMock,
  renderRoute,
  wait,
  waitForElement,
} from "../../../../testing";

const GuardedRouteTest: React.FC = () => (
  <GuardedRoute component={() => <div>test</div>} />
);

describe("guarded route", () => {
  afterEach(cleanup);

  it("delegates to login() function when not authenticated", async () => {
    const authMock = createAuthMock(false);
    const { queryByText } = renderRoute(GuardedRouteTest, { authMock });
    await wait();
    expect(queryByText(/test/)).not.toBeInTheDocument();
    expect(authMock.login).toHaveBeenCalled();
  });

  it("renders the child component when authenticated", async () => {
    const { getByText } = renderRoute(GuardedRouteTest);
    await waitForElement(() => getByText(/test/));
  });
});
