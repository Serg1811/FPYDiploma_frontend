import './styles/global.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import RegistrationForm from './components/registration/registrationForm'
import LoginForm from './components/login/loginForm';
import UserInterface from './components/user/user';
import AdminInterface from './components/admin/admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        children: [
          {
            path: '/login',
            element: <LoginForm />,
          },
          {
            path: 'registration',
            element: <RegistrationForm />,
          },
          {
            path: '/user',
            element: <UserInterface />,
          },
          {
            path: 'admin',
            element: <AdminInterface />,
          },
        ]
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
