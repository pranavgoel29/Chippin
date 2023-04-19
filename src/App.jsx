import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import { Pages } from "./routes";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const router = createBrowserRouter([
  { path: Pages.HOME, element: <Home /> },
  { path: Pages.LOGIN, element: <Login /> },
  { path: Pages.REGISTER, element: <Register /> }
]);

function App() {
  return (
    <div className="App">
      <GlobalStyle />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
