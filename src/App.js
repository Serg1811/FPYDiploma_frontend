import './styles/global.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StartPage from './page/page';
import Registration from './page/registration/page';
import Login from './page/login/page';
import User from './page/user/page';
import EditNameComment from './page/user/fileId/editNameComment/page';
import Admin from './page/admin/page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
    children: [
      {
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'registration',
            element: <Registration />,
          },
          {
            path: 'user/',
            element: <User />,
            children: [
              {
                path: 'file/:fileId/editNameComment',
                element: <EditNameComment/>
              },
            ],
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
