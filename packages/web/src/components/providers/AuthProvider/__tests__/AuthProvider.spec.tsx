import React from "react";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "..";
import {
  cleanup,
  createAuthMock,
  render,
  wait,
  waitForElement,
} from "../../../../testing";

describe("auth container", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => null);
  });
  afterEach(cleanup);

  it("displays the loading text while authorising", async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AuthProvider auth={createAuthMock()}>
          <div>test</div>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(getByText(/Loading/)).toBeInTheDocument();
    expect(queryByText(/test/)).not.toBeInTheDocument();
    await wait();
  });

  it("displays child component when authorised", async () => {
    const mockAuth = createAuthMock();
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AuthProvider auth={mockAuth}>
          <div>test</div>
        </AuthProvider>
      </MemoryRouter>
    );
    await waitForElement(() => getByText(/test/));
    expect(queryByText(/Loading/)).not.toBeInTheDocument();
    expect(mockAuth.silentAuth).toHaveBeenCalled();
  });

  it("handles auth errors gracefully", async () => {
    const mockAuth = createAuthMock();
    mockAuth.silentAuth.mockRejectedValueOnce("some error");
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AuthProvider auth={mockAuth}>
          <div>test</div>
        </AuthProvider>
      </MemoryRouter>
    );
    await waitForElement(() => getByText(/test/));
    expect(queryByText(/Loading/)).not.toBeInTheDocument();
    expect(mockAuth.silentAuth).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });
});
