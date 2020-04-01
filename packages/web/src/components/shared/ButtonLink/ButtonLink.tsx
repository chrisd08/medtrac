import { Button } from "@material-ui/core";
import { LocationDescriptor } from "history";
import React, { forwardRef } from "react";
import { LinkProps, NavLink as RouterLink } from "react-router-dom";

const CustomRouterLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => (
    <div style={{ flexGrow: 1 }}>
      <RouterLink innerRef={ref} {...props} />
    </div>
  )
);

interface ButtonLinkProps {
  to: LocationDescriptor;
  activeClassName: string;
  className: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = props => {
  return (
    <Button
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      component={CustomRouterLink}
    >
      {props.children}
    </Button>
  );
};

export { ButtonLink, CustomRouterLink };
