import React from "react";
import DashboardWrapper from "./DashboardWrapper";
import dashboard from "../../images/dashboard.png";
import transaction from "../../images/transaction.png";
import schedule from "../../images/schedule.png";
import user from "../../images/user.png";
import setting from "../../images/setting.png";
import revenue from "../../images/dollar.png";
import tags from "../../images/tags.png";
import like from "../../images/like.png";
import users from "../../images/user.png";
import Card from "../../common/Cards/Card";

import Mychart from "../../components/Mychart/Mychart";

const userdata = [
  {
    bgcolor: "#DDEFE0",
    title: "Total Revenues",
    data: "$2,129,430",
    icons: <img className="icon fav" src={revenue}></img>,
  },
  {
    bgcolor: "#F4ECDD",
    title: "Total Transactions",
    data: "1520",
    icons: <img className="icon fav" src={tags}></img>,
  },
  {
    bgcolor: "#EFDADA",
    title: "Total Likes",
    data: "9721",
    icons: <img className="icon fav" src={like}></img>,
  },
  {
    bgcolor: "#DEE0EF",
    title: "Total Users",
    data: "892",
    icons: <img className="icon fav" src={users}></img>,
  },
];

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="page-body">
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
        <div className="page-body-div2">
          <div className="dash-header"></div>
          <div className="dash-user">
            <Card
              bgcolor={userdata[0].bgcolor}
              title={userdata[0].title}
              data={userdata[0].data}
              icons={userdata[0].icons}
            />
            <Card
              bgcolor={userdata[1].bgcolor}
              title={userdata[1].title}
              data={userdata[1].data}
              icons={userdata[1].icons}
            />
            <Card
              bgcolor={userdata[2].bgcolor}
              title={userdata[2].title}
              data={userdata[2].data}
              icons={userdata[2].icons}
            />
            <Card
              bgcolor={userdata[3].bgcolor}
              title={userdata[3].title}
              data={userdata[3].data}
              icons={userdata[3].icons}
            />
          </div>
          
        </div>
      </div>
        <div className="charts">
            <Mychart />
          </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
