import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import { Pages } from "./routes";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Home/Dashboard";

import { Client, fetchExchange, Provider } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  Query,
  RegisterMutation,
} from "./generated/graphql";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",

    // Adding this for setting cookies
    headers: {
      "x-forwarded-proto": `https`,
    },
  },
});

const router = createBrowserRouter([
  { path: Pages.HOME, element: <Home /> },
  { path: Pages.LOGIN, element: <Login /> },
  { path: Pages.REGISTER, element: <Register /> },
  { path: Pages.DASHBOARD, element: <Dashboard /> },
  { path: Pages.CHANGE_PASSWORD, element: <ChangePassword /> },
]);

function App() {
  return (
    <Provider value={client}>
      <div className="App">
        <GlobalStyle />

        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
