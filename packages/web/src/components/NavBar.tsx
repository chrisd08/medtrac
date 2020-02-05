import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const NavBar: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {!isAuthenticated && (
        <Button variant="contained" color="primary" onClick={() => login()}>
          Log in
        </Button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;
