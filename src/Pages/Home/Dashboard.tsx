import React from "react";
import DashboardWrapper from "./DashboardWrapper";
import dashboard from "../../images/dashboard.png";
import schedule from "../../images/schedule.png";

import user from "../../images/user.png";
import setting from "../../images/setting.png";
import transaction from "../../images/transaction.png";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="page-body-div1">
        <div className="div1-sub1">
          <h1 className="div1-sub1-h1">Chippin.</h1>
          <ul className="div1-sub1-ul">
            <li className="div1-sub1-li def">
              <img className="icon" src={dashboard}></img>Dashboard
            </li>
            <li className="div1-sub1-li">
              <img className="icon" src={transaction}></img>Transactions
            </li>
            <li className="div1-sub1-li">
              <img className="icon" src={schedule}></img>Schedules
            </li>
            <li className="div1-sub1-li">
              <img className="icon" src={user}></img>Users
            </li>
            <li className="div1-sub1-li">
              <img className="icon" src={setting}></img>Settings
            </li>
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
