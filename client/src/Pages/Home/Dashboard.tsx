import React from "react";
import DashboardWrapper from "./DashboardWrapper";
// import schedule from "../../images/schedule.png";
// import setting from "../../images/setting.png";

import dashboard from "../../images/dashboard.png";
import user from "../../images/user.png";
import transaction from "../../images/transaction.png";
import { useMeQuery } from "../../generated/graphql";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const [{ data, fetching, error }] = useMeQuery();

  let body: any = "";

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
      </Grid>
    );
  } else {
    body = (
      <p>
        <b>{data.me.username}</b>
      </p>
    );
  }

  return (
    <DashboardWrapper>
      <div className="page-body-div1">
        <div className="div1-sub1">
          <h1 className="div1-sub1-h1">Chippin.</h1>
          <ul className="div1-sub1-ul">
            {body}
            <li className="div1-sub1-li def">
              <img className="icon" src={dashboard}></img>Dashboard
            </li>
            <li className="div1-sub1-li">
              <img className="icon" src={transaction}></img>Transactions
            </li>

            <li className="div1-sub1-li">
              <img className="icon" src={user}></img>User
            </li>
            {/* <li className="div1-sub1-li">
              <img className="icon" src={setting}></img>Settings
            </li> */}
          </ul>
        </div>
        <div className="div1-sub2">
          <p className="div1-sub2-bottom">Help</p>
          <p className="div1-sub2-bottom1">Contact us</p>
        </div>
      </div>
      <div className="page-body-div2">hii</div>
    </DashboardWrapper>
  );
};

export default Dashboard;
