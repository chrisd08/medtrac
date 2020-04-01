import { colors, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import { ButtonLink, Page } from "../../";

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

interface SidebarNavProps {
  className?: string;
  pages: Page[];
}

const SidebarNav: React.FC<SidebarNavProps> = props => {
  const { pages, className } = props;

  const classes = useStyles();

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map(page => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <ButtonLink
            activeClassName={classes.active}
            className={classes.button}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </ButtonLink>
        </ListItem>
      ))}
    </List>
  );
};

export { SidebarNav };
