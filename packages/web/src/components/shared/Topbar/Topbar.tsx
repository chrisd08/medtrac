import { AppBar, Badge, Hidden, IconButton, Toolbar } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

interface TopbarProps {
  className?: string;
  onSidebarOpen(event: React.MouseEvent<HTMLButtonElement>): void;
}

const Topbar: React.FC<TopbarProps> = props => {
  const { className, onSidebarOpen } = props;

  const classes = useStyles();

  return (
    <AppBar className={className}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logo.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary" title={"Notifications"}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            title={"Sign out"}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
            title={"Open sidebar"}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export { Topbar };

