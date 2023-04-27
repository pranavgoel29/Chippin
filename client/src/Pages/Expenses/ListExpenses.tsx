import React from "react";
import styled from "styled-components";
import {
  useDeleteExpenseMutation,
  useExpensesQuery,
} from "../../generated/graphql";
import theme from "../../styles/theme";
import ButtonWrapper from "../../common/ButtonWrapper";

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
  .expenseDetails {
    margin-bottom: 10px;
  }
`;

const ListExpenses = () => {
  const [{ data, fetching, error }, reexecute] = useExpensesQuery();
  const [, deleteExpense] = useDeleteExpenseMutation();
  const expenses = data?.expenses;
  console.log("data: ", data);

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
            <div className="expenseDetails">
              <h3>{exp.title}</h3>
              <p>₹{exp.price}</p>
            </div>
            <div>
              <ButtonWrapper>
                <button
                  className="form-button"
                  onClick={() => {
                    deleteExpense({ deleteExpenseId: exp.id as any });
                    reexecute({ requestPolicy: "network-only" });
                  }}
                >
                  Delete
                </button>
              </ButtonWrapper>
            </div>
          </div>
        ))
      )}
    </ListExpensesWrapper>
  );
};

export default ListExpenses;
