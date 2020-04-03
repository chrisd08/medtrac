import { cleanup, waitForDomChange } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Callback } from "..";
import { createAuthMock, renderRoute } from "../../../../testing";

describe("callback page", () => {
  afterEach(cleanup);

  it("redirects to the dashboard page", async () => {
    const authMock = createAuthMock();
    const history = createMemoryHistory({ initialEntries: ["/callback"] });
    const { container } = renderRoute(Callback, { history, authMock });
    await waitForDomChange({ container }).then(() => {
      expect(history.location.pathname).toBe("/dashboard");
      expect(authMock.authorise).toHaveBeenCalled();
    });
  });
});
