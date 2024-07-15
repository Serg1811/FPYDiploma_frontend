import "../../styles/interface.css"
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "../../hooks/selectors";

import UserMenu from "../../components/userMenu";
import FilesList from "../../components/filesList";


//КОМПОНЕНТ(роут) СТРАНИЦЫ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА
export default function UserInterface({id}) {
  const { isAuth, token } = useUser();
  const params = {};
  if (id) {
    params.user = id
  };
  const {paramsFilters, addParamsFilters } = useState(params)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      console.log(isAuth);
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <div
      className="interface__container"
    >
      <UserMenu />
      {/* <Search /> */}
      <FilesList
        token={token}
        params={paramsFilters}
      />
       <div
       >
        <Outlet />
      </div>
    </div>
  );
}
