import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";

const NavBar: React.FC = () => {
  const { handleLogin, handleLogout, loggedIn } = useAuth();

  return (
    <div>
      {!loggedIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin()}
        >
          Log in
        </Button>
      )}

      {loggedIn && <button onClick={() => handleLogout()}>Log out</button>}

      {loggedIn && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/dashboard">Dashboard</Link>
        </span>
      )}
    </div>
  );
};

export { NavBar };
