import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/styles";
import React, { ReactElement } from "react";
import { NavBar, Routes } from ".";
import { Auth } from "../services/auth";
import theme from "../theme";
import { createApolloClient } from "../utils/apollo";
import { AuthProvider } from "./providers/AuthProvider";

const auth = new Auth();
const client = createApolloClient(auth);

function App(): ReactElement {
  return (
    <AuthProvider auth={auth}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <div className="App">
            <NavBar />
            <Routes />
          </div>
        </ApolloProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
