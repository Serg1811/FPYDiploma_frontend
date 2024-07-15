import {  useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useState } from "react";
import {
  // createEmail,
  // createUsername,
  // createPassword,
  // createPasswordRepeat,
  createAttribute,
  createDataToValues,
} from '../features/validationSlice';
import { 
  emailValidation,
  loginValidation,
  passwordValidation,
  passwordRepeatValidation,
  filenameValidation,
} from '../lib/validation';
import { useValidation } from '../hooks/selectors';

//КОМПОНЕНТ ПОЛЕЙ ФОРМЫ registrationForm и loginForm
export default function FieldForm({attribute, text, type, defaultValue}) {
  const validationState = useValidation();
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
    filename: filenameValidation,
  };

useEffect(() => {
  if (defaultValue) {
      const value = {}
      value [attribute]=defaultValue
      console.log(Object[attribute]=defaultValue)
      dispatch(createDataToValues(value));
  }
},[defaultValue]);
  // const dispatchFunction = {
  //   email: createEmail,
  //   username: createUsername,
  //   password: createPassword,
  //   passwordRepeat: createPasswordRepeat,
  // }

  //Подсветка валидации поля ввода 
  const handlers = (e) => {
    const value = {};
    const target = e.target;
    if (defaultValue) {
      // e.onClick()
    }
    // console.log(validationState)
    console.log(attribute)
    if (validation[attribute]) {
      const isValid = validation[attribute](target.value, validationState.values.password);
      if (isValid.result) {
        value[attribute] = target.value;
        dispatch(createDataToValues(value));

        target.style.outline='4px solid green'
      } else {
        target.style.outline = '4px solid red';
      }
      value[attribute] = isValid;
      dispatch(createAttribute(value));
    } else {
      value[attribute] = target.value;
      dispatch(createDataToValues(value));
    }
    // value[attribute] = isValid;
    // dispatch(createAttribute(value));
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
          {(type === 'input') ? (
            <input
              className="input_field"
              autoComplete="off"
              id={`${attribute}`}
              type={!attribute.includes('password') ? "text" : showPassword ? "text" : "password"}
              name={attribute}
              defaultValue={defaultValue}
              onChange={(e) => handlers(e)}
            />
          ) : (
            (type ==='textarea') ? (
              <textarea
                className="input_field"
                autoComplete="off"
                id={`${attribute}`}
                type='text'
                name={attribute}
                defaultValue={defaultValue}
                onChange={(e) => handlers(e)}
              />
            ) : (null)
          )}


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
      </div>
    </>
  );
}
