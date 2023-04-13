import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";

export const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <Error />,
  },
  {
    path: "/todo",
    element: <Todo />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
