import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { ButtonLink } from "..";
import { fireEvent, render } from "../../../../testing";

describe("link button component", () => {
  it("links the user to the desired route", () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <ButtonLink className={"test"} activeClassName={"active"} to={"/test"}>
          test
        </ButtonLink>
      </Router>
    );

    const button = getByText("test");
    fireEvent.click(button);
    expect(history.location.pathname).toBe("/test");

    expect(button.parentElement?.classList).toContain("test");
    expect(button.parentElement?.classList).toContain("active");
  });
});
