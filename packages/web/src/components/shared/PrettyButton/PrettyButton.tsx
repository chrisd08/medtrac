import { Button, createStyles } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/styles";
import React from "react";

const styles = createStyles({
  root: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    borderRadius: 3,
    border: 0,
    height: 48,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
});

interface ButtonStyles
  extends WithStyles<typeof styles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FancyButton = withStyles(
  styles
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
)(({ classes, color, ...other }: ButtonStyles) => (
  <Button className={classes.root} {...other} />
));

export { FancyButton };
