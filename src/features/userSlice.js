import { createSlice } from '@reduxjs/toolkit';
import { Api } from '../app/services/api'

const initialState = {
  token: null,
  password: null,
  username: null,  
  first_name: null,
  email: null,
  id: null,
  is_staff: null,
  changePersonDataMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      return { ...state, token: action.payload.token};
    },
    setUsernamePassword: (state, action) => {
      const { username, password } = action.payload;
      return {...state, username: username, password: password};
    },
    resetUser: () => {
      return { ...initialState};
    },
    setUserInfo: (state, action) => {
      const { first_name, username, email, id, is_staff, changePersonDataMessage } = action.payload;
      return { ...state, first_name, username, email, id, is_staff, changePersonDataMessage };
    },
    // changeField: (state, action) => {
    //   const key = action.payload[0];
    //   const value = action.payload[1];
    //   state[key] = value;
    //   return state;
    // },
    // addChangeDataMessage: (state, action) => {
    //   return { ...state, changePersonDataMessage: action.payload };
    // },
    // resetChangeDataMessage: (state) => {
    //   return { ...state, changePersonDataMessage: null };
    // },
  },
  extraReducers: builder => {
    builder.addMatcher(
        Api.endpoints.getUserMeInfo.matchFulfilled,
        (state, action) => {
            state.first_name = action.payload.first_name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.is_staff = action.payload.is_staff;
        },
    );
  },
});

export const {
  setToken,
  setUsernamePassword,
  changeAvatar,
  resetUser,
  setUserInfo,
  changeField,
  addChangeDataMessage,
  resetChangeDataMessage,

} = userSlice.actions;

export default userSlice.reducer;
