import React from "react";
import { Grid } from "@mui/material";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import ButtonWrapper from "../../common/ButtonWrapper";
import styled from "styled-components";

import dashboard from "../../images/dashboard.png";
import user from "../../images/user.png";
import transaction from "../../images/transaction.png";

import { useNavigate } from "react-router-dom";
import { Pages } from "../../routes";
import SignUpWrapper from "../../common/SignUpWrapper";
import DashboardWrapper from "../../common/DashboardWrapper";
import theme from "../../styles/theme";

const HomeWrapper = styled.div`
  width: 30%;
  height: 90%;

  h2 {
    font-size: ${theme.heading4} !important;
    color: ${theme.light_beige} !important;
  }
  .userDetails {
    color: ${theme.light_gray} !important;
    p {
      padding-bottom: 10px;
    }
  }
`;

const UserDetails = () => {
  const navigate = useNavigate();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching, error }] = useMeQuery();

  let userBody: any = "";

  let body: any = "";

  console.log(data);

  if (fetching) {
    // User not logged in

    body = null;
    userBody = null;
  } else if (!data?.me) {
    //user is logged in
    console.log(data);
    navigate(Pages.LOGIN);
    body = "";
    userBody = (
      <Grid className="userDetails">
        <p style={{ color: "black" }}>Hii everyone</p>
        <ButtonWrapper>
          <button
            type="submit"
            className="form-button"
            onClick={() => navigate(Pages.REGISTER)}
          >
            Register
          </button>
        </ButtonWrapper>
      </Grid>
    );
  } else {
    body = <i>{data.me.username}</i>;
    userBody = (
      <Grid className="userDetails">
        <div style={{ padding: "30px 0px 20px 0px", marginBottom: "30px" }}>
          <p>
            <b>Username: {data.me.username}</b>
          </p>
          <p>
            <b>Email-ID: {data.me.email}</b>
          </p>
        </div>
        <ButtonWrapper>
          <button
            type="submit"
            className="form-button"
            style={{ width: "100%" }}
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
    <DashboardWrapper>
      <div className="page-body-div1">
        <div className="div1-sub1">
          <h1 className="div1-sub1-h1">Chippin.</h1>
          <ul className="div1-sub1-ul">
            <div className="div1-sub1-li-username">
              <b>Username: {body}</b>
            </div>
            <li
              className="div1-sub1-li"
              onClick={() => navigate(Pages.DASHBOARD)}
            >
              <img className="icon" src={dashboard}></img>Dashboard
            </li>
            <li
              className="div1-sub1-li"
              onClick={() => navigate(Pages.EXPENSES)}
            >
              <img className="icon" src={transaction}></img>Expenses
            </li>

            <li
              className="div1-sub1-li def"
              onClick={() => navigate(Pages.USER_DETAILS)}
            >
              <img className="icon" src={user}></img>User
            </li>
            {/* <li className="div1-sub1-li">
              <img className="icon" src={setting}></img>Settings
            </li> */}
          </ul>
        </div>
        {/* <div className="div1-sub2">
          <p className="div1-sub2-bottom">Help</p>
          <p className="div1-sub2-bottom1">Contact us</p>
        </div> */}
      </div>
      <div className="page-body-div2">
        <HomeWrapper>
          <div>
            <h2>User Details</h2>
            {userBody}
          </div>
        </HomeWrapper>
      </div>
    </DashboardWrapper>

    // <SignUpWrapper>
    //   <div className="head-div">Chippin.</div>
    //   <div className="main-div">
    //     <div className="sub-div1">
    //       <h1 className="title-heading">Chippin.</h1>
    //     </div>
    //     <div className="sub-div2">
    //       <div className="form-div">
    //         <h2 className="signup-head">User Details</h2>
    //         <HomeWrapper>
    //           <div>{body}</div>
    //         </HomeWrapper>
    //       </div>
    //     </div>
    //   </div>
    // </SignUpWrapper>
  );
};

export default UserDetails;
