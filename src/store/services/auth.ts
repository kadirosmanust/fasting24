// Need to use the React-specific entry point to import createApi
import type { RegisterResponse, RegisterRequest } from '@/types/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = 'https://fe-challange-24.me-f72.workers.dev/';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ['Register'],
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: credentials => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: RegisterResponse) => {
        return response;
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation } = authApi;
