import React from "react";
import { Grid } from "@mui/material";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import ButtonWrapper from "../../common/ButtonWrapper";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../routes";

const HomeWrapper = styled.div`
  .navBar {
    padding: 15px 30px 15px 30px;
    background-color: ${theme.dark_beige};
    color: ${theme.primaryColor};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .userDetails {
    display: flex;
    gap: 15px;
    align-items: center;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
      <Grid className="userDetails">
        <p style={{ color: "black" }}>Hii everyone</p>
        <ButtonWrapper>
          <button type="submit" className="form-button" onClick={()=>navigate(Pages.REGISTER)}>
            Register
          </button>
        </ButtonWrapper>
      </Grid>
    );
  } else {
    body = (
      <Grid className="userDetails">
        <p>
          <b>{data.me.username}</b>
        </p>
        <ButtonWrapper>
          <button
            type="submit"
            className="form-button"
            style={{ width: "100px" }}
            onClick={() => {
              //@ts-ignore
              logout();
              navigate(Pages.LOGIN);
            }}
          >
            Log out
          </button>
        </ButtonWrapper>
      </Grid>
    );
  }

  return (
    <HomeWrapper>
      <Grid className="navBar">
        <h3>Chippin.</h3>
        {body}
      </Grid>
    </HomeWrapper>
  );
};

export default Home;
