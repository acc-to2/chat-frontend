import { createBrowserRouter } from "react-router-dom";
import Chat from "../pages/Chat";
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import CognitoOuath from "../components/CognitoOauth";
import Friends from "../pages/Friends";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  { path: "callback", element: <CognitoOuath /> },
  { path: "main", element: <Main /> },
  { path: "friends", element: <Friends /> },

  {
    path: "chat/:roomId",
    element: <Chat />,
  },
]);

export default router;
