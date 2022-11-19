import { api } from "./api";
import { clearUser } from "@/features/user.slice";

export interface User {
  _id: string;
  name: string;
  email: string;
  lastName?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateRequest = Partial<
  Omit<User, "_id" | "createdAt" | "updatedAt">
>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

const setAuthCookie = () => {
  document.cookie = `auth_session=; max-age=${24 * 60 * 60}; SameSite=Strict`;
};

const clearAuthCookie = () => {
  document.cookie = "auth_session=; max-age=0; SameSite=Strict";
};

export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ["User", "Jobs", "Stats"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createUser: build.mutation<User, RegisterRequest>({
        query: (body) => ({
          url: "user/register",
          method: "POST",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
            setAuthCookie();
          } catch (err) {}
        },
      }),
      login: build.mutation<User, LoginRequest>({
        query: (body) => ({
          url: "user/login",
          method: "POST",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
            setAuthCookie();
          } catch (err) {}
        },
      }),
      getUser: build.query<User, void>({
        query: () => ({ url: "user", credentials: "include" }),
        keepUnusedDataFor: 5,
        providesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            setAuthCookie();
          } catch (err) {
            clearAuthCookie();
            dispatch(clearUser());
          }
        },
      }),
      updateUser: build.mutation<User, UpdateRequest>({
        query: (body) => ({
          url: "user",
          method: "PATCH",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            setAuthCookie();
          } catch (err) {}
        },
      }),
      logout: build.mutation<string, void>({
        query: () => ({
          url: "user",
          method: "DELETE",
          credentials: "include",
        }),
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            clearAuthCookie();
            dispatch(clearUser());
          } catch (err) {
            dispatch(clearUser());
          }
        },
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetUserQuery,
  useLoginMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLogoutMutation,
} = authApi;
