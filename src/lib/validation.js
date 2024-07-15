
// Валидация почты
export const emailValidation = (email) => {
  const valid = {message: []}
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!re.test(email)) {
    valid.message.push('НЕКОРРЕКТНАЯ ПОЧТА!')
    valid.result = false
  } else {
    valid.result = true
  }
  return valid;
}

// Валидация логина
export const loginValidation = (login) => {
  const valid = {message: []}
  if (/^[A-Z0-9]{4,16}$/i.test(login)) {
    valid.result =true
    return valid
  }
  valid.result = false
  if (login.length < 4) {
    valid.message.push('МЕНЬШЕ 4 СИМВОЛОВ')
  } else if (login.length > 16) {
    valid.message.push('БОЛЬШЕ 16 СИМВОЛОВ')
  }
  if (!/^[A-Z0-9]$/i.test(login)) {
    valid.message.push('ТОЛЬКО ИЗ ЛАТИНСКИХ БУКВ И ЦИФР!')
  }
  return valid;
}

// Валидация пароля
export const passwordValidation = (password) => {
  const valid = {message: []}
  const re = /^(?=.*?[A-Z])(?=(.*[a-z]){0,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,24}$/;
  if (re.test(password)) {
    valid.result =true
    return valid
  }
  valid.result = false
  if (password.length <8) {
    valid.message.push('НЕ МЕНЬШЕ 8 СИМВОЛОВ!')
  } else if (password.length > 24) {
    valid.message.push('НЕ БОЛЬШЕ 24 СИМВОЛОВ!')
  }
  if (/^(?=.*?[A-Z])(?=(.*[a-z]){0,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)$/i.test(password)) {
    valid.message.push('ТОЛЬКО ИЗ ЛАТИНСКИХ БУКВ, ЦИФР И СПЕЦИАЛЬНЫХ ЗНАКОВ!')
  }
  return valid;
}

// Валидация повторного ввода пароля

export const passwordRepeatValidation = (passwordRepeat, password) => {
  const valid = {message: []}
  if (password !== passwordRepeat) {
    valid.result = false;

    (password === undefined) ? valid.message.push('НЕКОРРЕКТНЫЙ ПАРОЛЬ!') : valid.message.push('НЕКОРРЕКТНЫЙ ПОВТОРНЫЙ ВВОД ПАРОЛЯ!')
  } else {
    valid.result = true;
  }
  return valid;
}

// Валидация имени файла

export const filenameValidation = (filename) => {
  const valid = {message: []}
  if (!filename&&filename.trim() === "") {
    valid.result = false;
    console.log(filename);
   valid.message.push('ПОЛЕ "ИМЯ ФАЙЛА" ОБЕЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ!')
  } else {
    valid.result = true;
  }
  return valid;
}
