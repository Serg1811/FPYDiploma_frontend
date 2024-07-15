import "../../styles/popup.css"
import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import { Form,
  useNavigate,
} from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import FieldForm from '../fieldForm'
import { 
  useGetTokenUserMutation,
  useGetUserMeInfoQuery,
} from "../../app/services/api";
import { useValidation } from "../../hooks/selectors";
import { setToken, setUsernamePassword }  from "../../features/userSlice";
import { resetValidation } from "../../features/validationSlice";
import { dataLoginForm } from "../../lib/data";
import { parsError } from "../../lib/errorParser";

// КОМПОНЕНТ(роут) СТРАНИЦЫ РЕГИСТРАЦИИ
export default function Login() {
  const { isValidLoginForm, values } = useValidation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const body = {
    username: values.username,
    password: values.password,
  };

  const [
    getTokenUser,
    { data: token, error: tokenUserError, isLoading: tokenUserIsLoading, isError: tokenUserIsError, isSuccess: tokenUserIsSuccess },
  ] = useGetTokenUserMutation();

  const [tokenReceived, setTokenReceived] = useState(skipToken);

  const { data: userMe, isSuccess: userMeIsSuccess } = useGetUserMeInfoQuery(tokenReceived); // Результат запроса перехватывается в extraReducers в userSlice и сохраняется в стор

  // ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР НА РЕГИСТРАЦИЮ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = async () => {
    if (isValidLoginForm) {
      await getTokenUser(JSON.stringify(body));
    }
  }

  useEffect(() => {
    if (tokenUserIsSuccess) {
      dispatch(setToken({ token: token.auth_token }));
      setTokenReceived(token.auth_token);
      dispatch(setUsernamePassword(body));
      dispatch(resetValidation());
    }
  }, [tokenUserIsSuccess]);

  useEffect(() => {
    if (userMeIsSuccess) {
      return userMe.is_staff ? navigate('/admin') : navigate('/user')
    }
  }, [userMeIsSuccess]);

  
  return (
    <div
      className="_hidden"
    >
      <div
        className="popup__container"
      >      
        <Form
          autoComplete="off"
          className="form__container"
          onSubmit={handleSubmit}
        >
          <span className="main__title hidden__title">Ввход в Cloud</span>
          {Object.keys(dataLoginForm).map((atr, index) => {
            return (
              <FieldForm
                key={index}
                attribute={atr}
                text={dataLoginForm[atr].text}
                type={dataLoginForm[atr].type}
              />
            );
          })}
          <div className="form-group">
            <button className="popup__send">отправить</button>
          </div>
        </Form> 
        <div
          className="server_response"
        >
          {tokenUserIsLoading ? (
            <div
              className="loading"
            >
              Loading...
            </div>
          ) :(
            null
          )}
          {tokenUserIsError ? (
            tokenUserError.status === 400 ? (
              <div
                className="form__error"
              >
                Ошибка при регистрации - ${parsError(tokenUserError)}
              </div>
            ):(
              <div
              className="form__error"
            >
              Ошибка: ${tokenUserError.error}
            </div>
            )
          ):(
            null
          )}
        </div>
        <div
            onClick={() => navigate('/registration')}            
            className="link"
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
        </div>

        <div
          onClick={() => navigate('/')}
          className="popup__close" 
          // to='/'
        >
          Закрыть окно
        </div>
      </div>
    </div>
  );
}
