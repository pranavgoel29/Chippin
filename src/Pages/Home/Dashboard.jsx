import React, { useState } from "react";
import DashboardWrapper from "./DashboardWrapper";
// import dashboard from "../../images/dashboard.png";
// import transaction from "../../images/transaction.png";
// import schedule from "../../images/schedule.png";
// import user from "../../images/user.png";
// import setting from "../../images/setting.png";

import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";

import Widget from "../../components/widget/Widget";
// import PieWidget from "../../components/widget/PieWidget";

import revenue from "../../images/dollar.png";
import tags from "../../images/tags.png";
import like from "../../images/like.png";
import users from "../../images/user.png";
// import Card from "../../common/Cards/Card";

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
  const [toggle, setToggle] = useState(true);
  const onclickMenu = () => {
    console.log(toggle);
    setToggle(!toggle);
  };
  return (
    <DashboardWrapper>
      <div id="menu" onClick={onclickMenu}>
        <div id="bar1" className="bar"></div>
        <div id="bar2" className="bar"></div>
        <div id="bar3" className="bar"></div>
      </div>
      {toggle ? (
        <div className="nav">
          <Sidebar />{" "}
        </div>
      ) : (
        <div className="change">
          <Sidebar />{" "}
        </div>
      )}
      <div className="home">
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="earning" />
            <Widget type="transaction" />
            <Widget type="like" />
            <Widget type="user" />
          </div>
          <div className="charts">
            <Mychart />
          </div>
          <div className="widgets">
            <PieWidget />
            <Widget />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
