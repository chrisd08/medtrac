import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/styles";
import React, { ReactElement } from "react";
import { AuthContainer } from "./containers/AuthContainer";
import { Routes } from "./Routes";
import { Auth } from "./services/auth";
import theme from "./theme";
import { createApolloClient } from "./utils/apollo";

const auth = new Auth();
const client = createApolloClient(auth);

function App(): ReactElement {
  return (
    <AuthContainer auth={auth}>
      {() => (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <div className="App">
              <Routes />
            </div>
          </ApolloProvider>
        </ThemeProvider>
      )}
    </AuthContainer>
  );
}

export default App;
