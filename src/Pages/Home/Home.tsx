import React from "react";
import { useMeQuery } from "../../generated/graphql";

const Home = () => {
  const [{ data, fetching, error }] = useMeQuery();

  let body: any = "";

  console.log(data);

  if (fetching) {
    // User not logged in
    // console.log(data);
    body = null;
  } else if (!data?.me) {
    //user is logged in
    console.log(data);
    // console.log(error)
    body = (
      <>
        <p style={{ color: "black" }}>Hii everyone</p>
        <p>Login</p>
      </>
    );
  } else {
    body = (
      <>
        <h2>{data.me.username}</h2>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "black" }}>Hii,</h3>
      {body}
    </>
  );
};

export default Home;
