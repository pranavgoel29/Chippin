import React, { useEffect } from "react";
import DashboardWrapper from "../../common/DashboardWrapper";
// import schedule from "../../images/schedule.png";
// import setting from "../../images/setting.png";

import dashboard from "../../images/dashboard.png";
import user from "../../images/user.png";
import transaction from "../../images/transaction.png";
import { useMeQuery } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../routes";
import CreateBudget from "../Budgets/CreateBudget";
import ListBudget from "../Budgets/ListBudget";
import BudgetsCalc from "../Budgets/BudgetCalc";

const Dashboard = () => {
  const navigate = useNavigate();
  const [{ data, fetching, error }, reexecute] = useMeQuery();

  let body: any = "";

  if (fetching) {
    // User not logged in
    // console.log(data);
    body = null;
  } else if (!data?.me) {
    //user is logged in
    console.log(data);
    navigate(Pages.LOGIN);
    // console.log(error)
    body = "";
  } else {
    body = <i>{data.me.username}</i>;
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
              className="div1-sub1-li def"
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
              className="div1-sub1-li"
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
      <div className="page-body-div2 dashboardRightContainer expensesRightContainer">
        <h2 className="rightSectionHeading">Dashboard</h2>
        <div style={{ display: "flex", gap: "40px" }}>
          <CreateBudget />
          <BudgetsCalc />
        </div>
        <ListBudget />
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
