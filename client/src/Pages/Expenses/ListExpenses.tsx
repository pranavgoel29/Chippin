import React from "react";
import styled from "styled-components";
import { useExpensesQuery } from "../../generated/graphql";
import theme from "../../styles/theme";

const ListExpensesWrapper = styled.div`
  padding: 20px 0px 20px 0px;
  margin-top: 20px;
  .expenseCard {
    background-color: ${theme.expenseCardBackgroundAccentColor};
    color: ${theme.button_font};
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
`;

const ListExpenses = () => {
  const [{ data, fetching, error }] = useExpensesQuery();
  const expenses = data?.expenses;
  console.log(data);

  let body: any = "";

  if (fetching) {
    // User not logged in

    body = null;
  } else if (expenses?.length == 0) {
    body = "No expenses added.";
  }

  return (
    <ListExpensesWrapper>
      {!data && fetching ? (
        <h3>Loading...</h3>
      ) : (
        data!.expenses.map((exp) => (
          <div className="expenseCard" key={exp.id}>
            <h3>{exp.title}</h3>
            <p>{exp.price}</p>
          </div>
        ))
      )}
      {!data && fetching ? (
        <h3>Loading...</h3>
      ) : (
        data!.expenses.map((exp) => (
          <div className="expenseCard" key={exp.id}>
            <h3>{exp.title}</h3>
            <p>{exp.price}</p>
          </div>
        ))
      )}
    </ListExpensesWrapper>
  );
};

export default ListExpenses;
