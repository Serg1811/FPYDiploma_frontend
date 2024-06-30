import "../../styles/popup.css"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,Form,
    useNavigate,
   } from 'react-router-dom';
import FieldForm from '../fieldForm'
import { 
  useRegistrationUserMutation,
 } from "../../app/services/api";
 import { cleanerValidation } from "../../features/validationSlice";
 import { dataRegistrationForm } from "../../lib/data";
 import { parsError } from "../../lib/errorParser";


// КОМПОНЕНТ(роут) СТРАНИЦЫ РЕГИСТРАЦИИ
export default function Registration() {
  const appState = useSelector((state) => state.validation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    addUser,
    { data: addData, error: addError, isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess },
  ] = useRegistrationUserMutation();

// ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР НА РЕГИСТРАЦИЮ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = async () => {
    const valid = Object.keys(dataRegistrationForm).map(e => appState[e].result).every(e => e);
    if (valid) {
      const body = {};
      body.email = appState.values.email;
      body.username = appState.values.username;
      body.password = appState.values.password;
      await addUser(JSON.stringify(body));
      dispatch(cleanerValidation());
    }
  }
  
  if (addIsSuccess) {
    return (
      <div
        className="_hidden"
      >
        <div
          className="popup__container"
        > 
          <div
            className="container"
          >
            ПОЛЬЗОВАТЕЛЬ "${addData.username}" УСПЕШНО ПРОШЁЛ РЕГИСТРАЦИЮ
          </div>     
          <div className="form-group">
            <button 
              className="popup__send"
              onClick={() => navigate('/login')}    
            >
              ВОЙТИ
            </button>
          </div>
          <div
            className="popup__close" 
            onClick={() => navigate('/')}
          >
            Закрыть окно
          </div>
        </div>
      </div>
    );

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
          {Object.keys(dataRegistrationForm).map((atr, index) => {
            return (
              <FieldForm
                key={index}
                attribute={atr}
                text={dataRegistrationForm[atr]}
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
          {addIsLoading ? (
            <div
              className="loading"
            >
              Loading...
            </div>
          ) :(
            null
          )}
          {addIsError ? (
            addError.status === 400 ? (
              <div
                className="form__error"
              >
                Ошибка при регистрации - ${parsError(addError)}
              </div>
            ):(
              <div
              className="form__error"
            >
              Ошибка: ${addError.error}
            </div>
            )
          ):(
            null
          )}
        </div>
        <div
          onClick={() => navigate('/login')}    
            className="link"
          >
            ВВХОД ДЛЯ ЗАРЕГИСТРИРОВАННОГО ПОЛЬЗОВАТЕЛЯ
        </div>

        <div
          className="popup__close" 
          onClick={() => navigate('/')}    
        >
          Закрыть окно
        </div>
      </div>
    </div>
  );
}
