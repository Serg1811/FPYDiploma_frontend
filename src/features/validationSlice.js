import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: {result: undefined, message: []},
  username: {result: undefined, message: []},
  password: {result: undefined, message: []},
  passwordRepeat: {result: undefined, message: []},
  filename: {result: undefined, message: []},
  values :{
    email: null,
    username: null,
    password: null,
    passwordRepeat: null,
    filename: null,
    fileComment: null,
  },
};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    createAttribute: (state, action) => {
      return { ...state, ...action.payload };
    },
    createDataToValues: (state, action) => {
      return { ...state, values: { ...state.values, ...action.payload } };
    },
    resetValidation: () => {
      return { ...initialState };
    }
  },
});

export const {
  createAttribute,
  createDataToValues,
  resetValidation,
} = validationSlice.actions;

export default validationSlice.reducer;
