import { DashboardComponent } from "..";
import { MeDocument } from "../../../../generated";
import {
  cleanup,
  renderRoute,
  waitForElement,
} from "../../../../testing/__utils";

const mocks = [
  {
    request: {
      query: MeDocument,
    },
    result: {
      data: {
        me: {
          username: "test",
          profiles: [{ name: "test" }],
        },
      },
    },
  },
];

describe("dashboard page", () => {
  afterEach(cleanup);

  it("displays the loading text", async () => {
    const { getByText } = renderRoute(DashboardComponent);
    await waitForElement(() => getByText(/Loading/));
  });

  it("displays the user's data", async () => {
    const { getByText } = renderRoute(DashboardComponent, {
      mocks,
      addTypename: false,
    });
    await waitForElement(() => getByText(/User Data/));
  });
});
