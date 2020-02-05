import { ApolloProvider } from "@apollo/react-hooks";
import React, { ReactElement } from "react";
import { AuthContainer } from "./containers/AuthContainer";
import { Routes } from "./Routes";
import { Auth } from "./services/auth";
import { createApolloClient } from "./utils/apollo";

const auth = new Auth();
const client = createApolloClient(auth);

function App(): ReactElement {
  return (
    <AuthContainer auth={auth}>
      {() => (
        <ApolloProvider client={client}>
          <div className="App">
            <Routes />
          </div>
        </ApolloProvider>
      )}
    </AuthContainer>
  );
}

export default App;
