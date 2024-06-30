import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useState } from "react";
import {
  createEmail,
  createUsername,
  createPassword,
  createPasswordRepeat,
  createDataToValues,
} from '../features/validationSlice';
import { 
  emailValidation,
  loginValidation,
  passwordValidation,
  passwordRepeatValidation
} from '../lib/validation';

//КОМПОНЕНТ ПОЛЕЙ ФОРМЫ РЕГИСТРАЦИИ
export default function FieldForm({attribute, text}) {
  const appState = useSelector((state) => state.validation);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // Показать/скрыть поле пароля
  const handleShowPassword = () => setShowPassword(!showPassword);

  // Обработчикки ввода пароля
  const validation = {
    email: emailValidation,
    username: loginValidation,
    password: passwordValidation,
    passwordRepeat: passwordRepeatValidation,
  };

  const dispatchFunction = {
    email: createEmail,
    username: createUsername,
    password: createPassword,
    passwordRepeat: createPasswordRepeat,
  }

  //Подсветка валидации поля ввода 
  const handlers = (e) => {
    const target = e.target;
    const isValid = validation[attribute](target.value, appState.values.password);
    if (isValid.result) {
      const value = {};
      value[attribute] = target.value;
      dispatch(createDataToValues(value));

      target.style.outline='4px solid green'
    } else {
      target.style.outline = '4px solid red';
    }
    dispatch(dispatchFunction[attribute](isValid));
  };

  return (
    <>
      <label
        htmlFor={`${attribute}`}
        className="form__text"
      >
        {text}
      </label>
      <div
        className="container"
      >
        <div
          className='input__container'
        >
          <input
            autoComplete="off"
            id={`${attribute}`}
            type={!attribute.includes('password') ? "text" : showPassword ? "text" : "password"}
            name={attribute}
            className="input_field"
            onChange={(e) => handlers(e)}
          />
          {attribute.includes('password') ? (
            <div
              id={`show_${attribute}`}
              className="show_password__container"
              onClick={handleShowPassword}
            >
              <img
                id={`img_show_${attribute}`}
                src={showPassword ? "/img/eye_hide.png" : "/img/eye_show.png"}
                alt=""
                className="show_password__image"
              />
            </div>
          ) : (null)}
        </div>
        <div
          className="form__error"
        >
          {!appState[attribute].result ? (
            appState[attribute].message.map((error, index) => {
              return (
                <p
                key={index+1}
                >
                  {index+1}. {error}
                </p>
              )
            })
          ):(
            null
          )}
        </div>
      </div>
    </>
  );
}
