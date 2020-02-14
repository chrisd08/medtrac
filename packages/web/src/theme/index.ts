import { createMuiTheme, Theme } from "@material-ui/core";
import overrides from "./overrides";
import palette from "./palette";
import typography from "./typography";

declare module "@material-ui/styles" {
  interface DefaultTheme extends Theme {
    palette: typeof palette;
  }
}

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
