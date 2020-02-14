import { Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = props => {
  const { className } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{" "}
        <Link component="a" href="https://medtrac.eu/" target="_blank">
          Medtrac
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu risus id
        erat lobortis elementum. Sed ipsum ipsum, finibus sit amet mauris eu,
        accumsan egestas lorem.
      </Typography>
    </div>
  );
};

export { Footer };
