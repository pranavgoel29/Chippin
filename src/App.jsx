import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import { Pages } from "./routes";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Signup from './Pages'
import Register from "./Pages/Register";
import { Client, cacheExchange, fetchExchange, Provider } from "urql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter([
  { path: Pages.HOME, element: <Home /> },
  { path: Pages.LOGIN, element: <Login /> },
  { path: Pages.REGISTER, element: <Register /> },
  {path:Pages.SIGNUP, element:<Signup/>}
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
