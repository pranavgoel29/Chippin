import React from "react";
import styled from "styled-components";
import { useBudgetsQuery, useExpensesQuery } from "../../generated/graphql";
import theme from "../../styles/theme";

const BudgetsCalcWrapper = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${theme.expenseCardBackgroundAccentColor};
  border-radius: 12px;

  .expenseCalcCard {
    color: ${theme.button_font};
    padding: 40px;
  }
  .expenseDetails {
    margin-bottom: 10px;
  }

  .subDetails {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 5px;
  }
`;

const BudgetsCalc = () => {
  const [{ data, fetching, error }, reexecute] = useExpensesQuery();
  const [{ data: dataBudget, fetching: fetchingBudget }] = useBudgetsQuery();

  let body: any = "";

  // const expenses = !data && fetching ? undefined : data?.expenses;
  console.log("data: ", data);
  console.log("Budgets: ", dataBudget);

  const budgets = dataBudget?.budgets;

  let total = 0;
  let totalbudget = 0;
  let budgetTitle;
  let noOfExpenses;

  !data && fetching
    ? undefined
    : data!.expenses.map((exp) => {
        total = total + parseInt(exp.price);
      });

  !dataBudget && fetchingBudget
    ? undefined
    : dataBudget!.budgets.map((budg) => {
        totalbudget = totalbudget + parseInt(budg.price);
        budgetTitle = budg.title;
      });

  if (fetching) {
    // User not logged in

    body = null;
  } else if (data?.expenses?.length == 0) {
    noOfExpenses = data?.expenses.length;
  } else {
    noOfExpenses = data?.expenses.length;
  }

  return (
    <>
      {!data && fetching ? null : budgets?.length == 0 ? null : (
        <BudgetsCalcWrapper>
          {!data && fetching ? (
            <h3>Loading...</h3>
          ) : (
            <div className="expenseCalcCard">
              <h2
                style={{ color: `${theme.button_font}`, marginBottom: "25px" }}
              >
                {budgetTitle} Budget Details
              </h2>
              <div className="expenseCalcDetails">
                <div className="subDetails">
                  <h3>No. of Expenses:</h3>
                  <p>{noOfExpenses}</p>
                </div>
                <div className="subDetails">
                  <h3>Total Expense:</h3>
                  <p>₹{total}</p>
                </div>
                <div className="subDetails">
                  <h3>Total Budget:</h3>
                  <p>₹{totalbudget}</p>
                </div>
                <div className="subDetails" style={{ marginTop: "20px" }}>
                  <h3>Budget Remaining:</h3>
                  <p>{totalbudget - total}</p>
                </div>
              </div>
            </div>
          )}
        </BudgetsCalcWrapper>
      )}
    </>
  );
};

export default BudgetsCalc;
