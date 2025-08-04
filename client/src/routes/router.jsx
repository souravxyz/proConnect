import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import Login from "../components/pages/auth/Login";
import Register from "../components/pages/auth/Register";
import Profile from "../components/pages/Profile";
import EditProfile from "../components/pages/auth/EditProfile";
import VerifyResult from "../components/pages/auth/VerifyResult";

import ForgotPassword from "../components/pages/auth/ForgotPassword";
import ResetPassword from "../components/pages/auth/ResetPassword";
import Feed from "../components/pages/Feed";
import ChangePassword from "../components/pages/auth/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
     { path: "verify-result", element: <VerifyResult /> },
      { path: "profile/:userId", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "feed", element: <Feed /> },
    ],
  },
]);

export default router;
