import { 
  createApi, 
  fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: headers => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registrationUser: builder.mutation({
      query: body => ({
        url: "/api/v1/users/",
        method: "POST",
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    getTokenUser: builder.mutation({
      query: body => ({
        url: '/auth/token/login/',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    getUserMeInfo: builder.query({
      query: token => {
        return {
          url: `/api/v1/users/me/`,
          headers: { Authorization: `Token ${token}` },
        };
      },
    }),

  })  
})

export const {
  useRegistrationUserMutation,
  useGetTokenUserMutation,
  useGetUserMeInfoQuery,
} = Api;
