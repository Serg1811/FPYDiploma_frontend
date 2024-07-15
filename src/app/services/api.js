import { 
  createApi, 
  fetchBaseQuery ,
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
    getFiles: builder.query({
      query: ({ token, params }) => {
        return {
          url: `/api/v1/files/`,
          headers: { Authorization: `Token ${token}` },
          params,
        };
      },
      providesTags: ['Files'],
    }),
    sendFile: builder.mutation({
      query: ({ body, token }) => ({
        url: '/api/v1/files/',
        method: 'POST',
        body,
        headers: { Authorization: `Token ${token}` },
        formData: true,
      }),
      invalidatesTags: ['Files'],
    }),
    // getFilesId: builder.query({
    //   query: ({ id, token }) => {
    //     return {
    //       url: `/api/v1/files/${id}/`,
    //       headers: { Authorization: `Token ${token}` },
    //       // params,
    //     };
    //   },
    //   providesTags: ['Files'],
    // }),
    downloadFileId: builder.mutation({
      // query: ({ id, token }) => ({
      //   url: `/api/v1/files/${id}/download/`,
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      //   // responseHandler: async (response) => window.location.assign(window.URL.createObjectURL(await response.blob())),
      //   // cache: "no-cache",
      // }),
      queryFn: async ({ id, name, token }, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `/api/v1/files/${id}/download/`,
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          },
          responseHandler: ((response) => response.blob())
        })
        var element = document.createElement('a');
        var url = window.URL || window.webkitURL;
        var blob = url.createObjectURL(result.data);
        element.href = blob;
        element.target = '_blank';
        element.download = `${name}`;
        element.click();
        // setTimeout(() => { document.body.removeChild(element); url.revokeObjectURL(blob); }, 2000);
        return { data: null }
      },      
      // overrideExisting: false,
      invalidatesTags: ['Files', 'Users'],
    }),
    deleteFileId: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/v1/files/${id}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Files', 'Users'],
    }),
    editFileId: builder.mutation({
      query: ({ id, token, body }) => {
        return {
          url: `/api/v1/files/${id}/`,
          method: 'PATCH',
          body,
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
            },
        };
      },
      invalidatesTags: ['Files'],
    }),

  })  
})

export const {
  useRegistrationUserMutation,
  useGetTokenUserMutation,
  useGetUserMeInfoQuery,
  useGetFilesQuery,
  // useGetFilesIdQuery,
  useSendFileMutation,
  useDownloadFileIdMutation,
  useDeleteFileIdMutation,
  useEditFileIdMutation,
} = Api;
