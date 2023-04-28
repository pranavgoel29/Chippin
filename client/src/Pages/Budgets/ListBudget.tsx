import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useBudgetsQuery,
  useDeleteBudgetMutation,
} from "../../generated/graphql";
import theme from "../../styles/theme";
import ButtonWrapper from "../../common/ButtonWrapper";

const ListBudgetWrapper = styled.div`
  padding: 20px 0px 20px 0px;
  margin-top: 20px;
  height: 100%;
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

const ListBudget = () => {
  const [{ data, fetching, error }, reexecute] = useBudgetsQuery();
  const [, deleteBudget] = useDeleteBudgetMutation();
  const budgets = data?.budgets;
  console.log("data: ", data);

  useEffect(() => {
    reexecute({ requestPolicy: "network-only" });
  }, []);

  let body: any = "";

  if (fetching) {
    // User not logged in

    body = null;
  } else if (budgets?.length == 0) {
    body = "No budgets added.";
  }

  return (
    <ListBudgetWrapper>
      {!data && fetching ? (
        <h3>Loading...</h3>
      ) : budgets?.length == 0 ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>{body}</h2>
        </div>
      ) : budgets?.length != undefined ? (
        data!.budgets.map((exp) => (
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
                    deleteBudget({ deleteBudgetId: exp.id as any });
                    reexecute({ requestPolicy: "network-only" });
                  }}
                >
                  Delete
                </button>
              </ButtonWrapper>
            </div>
          </div>
        ))
      ) : (
        "null"
      )}
    </ListBudgetWrapper>
  );
};

export default ListBudget;
