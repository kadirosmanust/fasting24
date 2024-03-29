import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RegisterRequest, RegisterResponse } from '@/types/auth';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  reducerPath: 'authApi',
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: credentials => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
