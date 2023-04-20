import React from "react";
// import { useMeQuery } from "../../generated/graphql";
import { gql, useQuery } from "urql";

const TodosQuery = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const Home = () => {
  // const [{ data, fetching, error }] = useMeQuery();
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });

  const { data, fetching, error } = result;
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
        <p>{data.me.username}</p>
      </>
    );
  }

  return (
    <>
      {/* <p style={{ color: "black" }}>Hii everyone</p> */}
      {body}
    </>
  );
};

export default Home;
