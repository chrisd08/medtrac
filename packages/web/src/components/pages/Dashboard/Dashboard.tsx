import { Paper } from "@material-ui/core";
import React from "react";
import { useUser } from "../../../hooks/useUser";
import { ProfileForm } from "../../forms";
import { Default } from "../../layouts";

export const DashboardComponent: React.FC = () => {
  const user = useUser();

  //const { data, loading } = useMeQuery();

  return (
    <Paper style={{ padding: 20 }}>
      <h1>Dashboard Page</h1>
      {/* loading ||  */ !user ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProfileForm />
          {/* <img src={user.picture} alt="Profile" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>Auth Data</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <h3>User Data (Database)</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
      )}
    </Paper>
  );
};

export const Dashboard: React.FC = () => (
  <Default>
    <DashboardComponent />
  </Default>
);
