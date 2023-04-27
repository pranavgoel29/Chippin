import React from "react";
import styled from "styled-components";
import { useExpensesQuery } from "../../generated/graphql";
import theme from "../../styles/theme";

const ExpensesCalcWrapper = styled.div`
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

const ExpensesCalc = () => {
  const [{ data, fetching, error }, reexecute] = useExpensesQuery();

  let body: any = "";

  // const expenses = !data && fetching ? undefined : data?.expenses;
  console.log("data: ", data);

  let total = 0;
  let noOfExpenses;

  !data && fetching
    ? undefined
    : data!.expenses.map((exp) => {
        total = total + parseInt(exp.price);
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
    <ExpensesCalcWrapper>
      {!data && fetching ? (
        <h3>Loading...</h3>
      ) : (
        <div className="expenseCalcCard">
          <h2 style={{ color: `${theme.button_font}`, marginBottom: "25px" }}>
            Expenses Details
          </h2>
          <div className="expenseCalcDetails">
            <div className="subDetails">
              <h3>No. of Expenses:</h3>
              <p>{noOfExpenses}</p>
            </div>
            <div className="subDetails">
              <h3>Total Expense:</h3>
              <p>{total}</p>
            </div>
          </div>
        </div>
      )}
    </ExpensesCalcWrapper>
  );
};

export default ExpensesCalc;
