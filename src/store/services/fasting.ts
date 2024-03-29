import {
  Fasting,
  FastingDeleteRequest,
  FastingsGetRequest,
} from '@/types/fasting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

export const fastingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Fasting'],
  reducerPath: 'fastingApi',
  endpoints: builder => ({
    getUserFastings: builder.query<Fasting[], FastingsGetRequest>({
      query: arg =>
        `fasting/getUserFasting/${arg.userId}?limit=${arg.limit}&page=${arg.page}`,
      providesTags: ['Fasting'],
    }),
    getActiveFasting: builder.query<Fasting | null, FastingsGetRequest>({
      query: arg => `fasting/getActiveFasting/${arg.userId}`,
    }),
    deleteUserFasting: builder.mutation<void, FastingDeleteRequest>({
      query: arg => ({
        url: `fasting/deleteFasting/${arg.userId}/${arg.fastingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fasting'],
    }),
    updateFasting: builder.mutation<Fasting, Partial<Fasting>>({
      query: (body: Partial<Fasting>) => ({
        url: `fasting/updateFasting/${body._id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Fasting'],
    }),
    createFasting: builder.mutation<Fasting, Partial<Fasting>>({
      query: (body: Partial<Fasting>) => ({
        url: `fasting/createFasting`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Fasting'],
    }),
  }),
});

export const {
  useGetUserFastingsQuery,
  useDeleteUserFastingMutation,
  useUpdateFastingMutation,
  useCreateFastingMutation,
  useGetActiveFastingQuery,
} = fastingApi;
