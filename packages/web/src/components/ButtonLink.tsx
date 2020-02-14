import { Button, ButtonProps } from "@material-ui/core";
import { LocationDescriptor } from "history";
import React, { forwardRef } from "react";
import { LinkProps, NavLink as RouterLink } from "react-router-dom";

const CustomRouterLink = forwardRef<HTMLDivElement, LinkProps>((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

interface ButtonLinkProps extends ButtonProps {
  to: LocationDescriptor;
  activeClassName: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = props => {
  return (
    <Button
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      component={({ innerRef, ...linkProps }) => (
        <CustomRouterLink {...linkProps} to={props.to} />
      )}
    >
      {props.children}
    </Button>
  );
};

export { ButtonLink, CustomRouterLink };
