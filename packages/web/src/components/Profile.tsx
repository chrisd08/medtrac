import React, { useEffect } from "react";
import { useAuth0 } from "../providers/AuthProvider";

const Profile: React.FC = () => {
  const { loading, user, getTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(getTokenSilently);
    const getData = async (): Promise<void> => {
      const token = await getTokenSilently();
      const response = await fetch("/graphql", {
        method: "POST",
        body: `{"operationName":null,"variables":{},"query":"{authors {id}}"}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    };
    getData();
  }, [getTokenSilently]);

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
