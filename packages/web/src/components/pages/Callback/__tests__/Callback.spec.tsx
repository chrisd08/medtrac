import { cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Callback } from "..";
import { createAuthMock } from "../../../../testing/__mocks";
import { renderRoute, waitForElement } from "../../../../testing/__utils";

describe("callback page", () => {
  afterEach(cleanup);

  it("redirects to the dashboard page", async () => {
    const authMock = createAuthMock();
    const history = createMemoryHistory({ initialEntries: ["/callback"] });
    const { getByText } = renderRoute(Callback, { history, authMock });
    await waitForElement(() => getByText(/Dashboard/));
    expect(history.location.pathname).toBe("/dashboard");
    expect(authMock.authorise).toHaveBeenCalled();
  });
});
