import React from "react";

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Username from "./Components/Username";
import Password from "./Components/Password";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Recovery from "./Components/Recovery";
import Reset from "./Components/Reset";
import Urlshortner from "./Components/Urlshortner";
import { AuthorizeUser,ProtectRoute } from "./middleware/auth";

const router = createBrowserRouter([
  {
    path:"/",
    element:<div><Username/></div>
  },
  {
    path:"/password",
    element:<ProtectRoute><Password/></ProtectRoute>
  },
  {
    path:"/register",
    element:<div><Register/></div>
  },
  {
    path:"/recovery",
    element:<div><Recovery/></div>
  },
  {
    path:"/reset",
    element:<div><Reset/></div>
  },
  {
    path:"/urlshortner",
    element:<AuthorizeUser><Urlshortner/></AuthorizeUser>
  },
  {
    path:"/profile",
    element:<AuthorizeUser><Profile/></AuthorizeUser>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;
