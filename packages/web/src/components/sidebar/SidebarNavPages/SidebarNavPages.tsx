import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImageIcon from "@material-ui/icons/Image";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import React, { ReactElement } from "react";

export interface Page {
  title: string;
  href: string;
  icon: ReactElement;
}

const pages: Page[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <PeopleIcon />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <ShoppingBasketIcon />,
  },
  {
    title: "Authentication",
    href: "/sign-in",
    icon: <LockOpenIcon />,
  },
  {
    title: "Typography",
    href: "/typography",
    icon: <TextFieldsIcon />,
  },
  {
    title: "Icons",
    href: "/icons",
    icon: <ImageIcon />,
  },
  {
    title: "Account",
    href: "/account",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

export { pages };
