import React from "react";

import { useMeQuery } from "../../generated/graphql";

import dashboard from "../../images/dashboard.png";
import user from "../../images/user.png";
import transaction from "../../images/transaction.png";

import { useNavigate } from "react-router-dom";
import { Pages } from "../../routes";

import DashboardWrapper from "../../common/DashboardWrapper";

import CreateExpense from "./CreateExpense";
import ListExpenses from "./ListExpenses";
import ExpensesCalc from "./ExpensesCalc";

const Expenses = () => {
  const navigate = useNavigate();
  const [{ data, fetching, error }] = useMeQuery();

  let body: any = "";

  // console.log(data);

  if (fetching) {
    // User not logged in

    body = null;
  } else if (!data?.me) {
    //user is logged in
    // console.log(data);
    navigate(Pages.LOGIN);
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
              className="div1-sub1-li"
              onClick={() => navigate(Pages.DASHBOARD)}
            >
              <img className="icon" src={dashboard}></img>Dashboard
            </li>
            <li className="div1-sub1-li def">
              <img className="icon" src={transaction}></img>Expenses
            </li>

            <li
              className="div1-sub1-li"
              onClick={() => navigate(Pages.USER_DETAILS)}
            >
              <img className="icon" src={user}></img>User
            </li>
          </ul>
        </div>
      </div>
      <div className="page-body-div2 dashboardRightContainer expensesRightContainer">
        <h2 className="rightSectionHeading">Expenses</h2>
        <div style={{ display: "flex", gap:'40px', height:'340px' }}>
          <CreateExpense />
          <ExpensesCalc />
        </div>
        <ListExpenses />
      </div>
    </DashboardWrapper>
  );
};

export default Expenses;
