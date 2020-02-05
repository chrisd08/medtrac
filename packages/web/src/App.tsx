import { ApolloProvider } from "@apollo/react-hooks";
import React, { ReactElement } from "react";
import { useAuth } from "./hooks/useAuth";
import { Routes } from "./Routes";
import { createApolloClient } from "./utils/apollo";

const client = createApolloClient();

function App(): ReactElement {
  const authing = useAuth();

  if (authing) {
    return <div>Loading</div>;
  } else {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Routes />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
