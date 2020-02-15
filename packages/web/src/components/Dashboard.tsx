import React from "react";
import { useMeQuery } from "../generated/graphql";
import useUser from "../hooks/useUser";
import { Default } from "./layouts";

export const Dashboard: React.FC = () => {
  const user = useUser();

  const { loading } = useMeQuery();

  return (
    <Default>
      {loading || !user ? (
        <div>Loading...</div>
      ) : (
        <>
          <img src={user.picture} alt="Profile" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <code>{JSON.stringify(user, null, 2)}</code>
        </>
      )}
    </Default>
  );
};
