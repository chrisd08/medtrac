import React from "react";
import { useMeQuery } from "../@types/graphql";
import useUser from "../hooks/useUser";

const Profile: React.FC = () => {
  const user = useUser();

  const { loading, data } = useMeQuery();

  console.log(loading, data);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Profile;
