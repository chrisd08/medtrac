import { MockedProvider, MockedProviderProps } from "@apollo/react-testing";
import { ThemeProvider } from "@material-ui/core";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import React, { ComponentType, ReactElement } from "react";
import { Router } from "react-router-dom";
import { AuthProvider } from "../components/providers/AuthProvider";
import { AuthInterface } from "../services/auth";
import theme from "../theme";
import { createAuthMock } from "./__mocks";

type RenderApolloOptions = Partial<RenderOptions> &
  Partial<MockedProviderProps>;

const renderApollo = (
  node: ReactElement,
  {
    mocks,
    addTypename,
    defaultOptions,
    cache,
    resolvers,
    ...options
  }: RenderApolloOptions = {}
): RenderResult => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options
  );
};

const renderRoute = (
  Component: ComponentType,
  options: RenderApolloOptions & {
    history?: MemoryHistory;
    authMock?: AuthInterface;
  } = {}
): RenderResult => {
  return renderApollo(
    <Router history={options.history ?? createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <AuthProvider auth={options.authMock ?? createAuthMock()}>
          <Component />
        </AuthProvider>
      </ThemeProvider>
    </Router>,
    options
  );
};

export * from "@testing-library/react";
export { renderApollo, renderRoute };
