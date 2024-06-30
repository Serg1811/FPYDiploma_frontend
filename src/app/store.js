import { configureStore} from '@reduxjs/toolkit';
import validationReducer from '../features/validationSlice';
import userReducer from '../features/userSlice';
import { Api } from './services/api'

export const store = configureStore({
  reducer: {
    validation: validationReducer,
    user: userReducer,
    [Api.reducerPath]: Api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware)
});

