import { createBrowserRouter } from "react-router-dom";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
]);

export default router;
