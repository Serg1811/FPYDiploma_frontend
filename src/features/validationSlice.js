import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: {result: undefined, message: []},
  username: {result: undefined, message: []},
  password: {result: undefined, message: []},
  passwordRepeat: {result: undefined, message: []},
  values :{},
};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    createEmail: (state, action) => {
      return { ...state, email: action.payload };
    },
    createUsername: (state, action) => {
      return { ...state, username: action.payload };
    },
    createPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    createPasswordRepeat: (state, action) => {
      return { ...state, passwordRepeat: action.payload };
    },
    createDataToValues: (state, action) => {
      return { ...state, values: { ...state.values, ...action.payload } };
    },
    cleanerValidation: (state) => {
      return { ...state, 
        email: {result: undefined, message: []},
        username: {result: undefined, message: []},
        password: {result: undefined, message: []},
        passwordRepeat: {result: undefined, message: []},
        values :{},
      }
    }
  },
});

export const {
  createEmail,
  createUsername,
  createPassword,
  createPasswordRepeat,
  createDataToValues,
  cleanerValidation,
} = validationSlice.actions;

export default validationSlice.reducer;
