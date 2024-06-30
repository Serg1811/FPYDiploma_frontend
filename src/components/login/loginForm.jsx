import "../../styles/popup.css"
import React,
 { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,Form,
    useNavigate,
   } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import FieldForm from '../fieldForm'
import { 
  useGetTokenUserMutation,
  useGetUserMeInfoQuery,
 } from "../../app/services/api";
 import { cleanerValidation } from "../../features/validationSlice";
 import { userActions } from '../../features/userSlice';
 
 import { dataLoginForm } from "../../lib/data";
 import { parsError } from "../../lib/errorParser";

// КОМПОНЕНТ(роут) СТРАНИЦЫ РЕГИСТРАЦИИ
export default function Login() {
  const appState = useSelector((state) => state.validation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [
    getTokenUser,
    { data: token, error: tokenUserError, isLoading: tokenUserIsLoading, isError: tokenUserIsError, isSuccess: tokenUserIsSuccess },
  ] = useGetTokenUserMutation();

  const [tokenReceived, setTokenReceived] = useState(skipToken);
  useGetUserMeInfoQuery(tokenReceived); // Результат запроса перехватывается в extraReducers в userSlice и сохраняется в стор

// ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР НА РЕГИСТРАЦИЮ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = async () => {
    console.log(process.env);
    const valid = Object.keys(dataLoginForm).map(e => appState[e].result).every(e => e);
    if (valid) {
      const body = {};
      body.username = appState.values.username;
      body.password = appState.values.password;
      await getTokenUser(JSON.stringify(body));
      dispatch(cleanerValidation());
    }
  }
  
  if (tokenUserIsSuccess) {
    console.log(userActions)
    return navigate('/')

  }
  
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
          <span className="main__title hidden__title">Регистрация в Cloud</span>
          {Object.keys(dataLoginForm).map((atr, index) => {
            return (
              <FieldForm
                key={index}
                attribute={atr}
                text={dataLoginForm[atr]}
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
