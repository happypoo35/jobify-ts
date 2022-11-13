import { api } from "./api";
import { setAlert } from "@/features/global.slice";
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

export interface CreateRequest extends LoginRequest {
  name: string;
}

export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ["User", "Jobs", "Stats"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createUser: build.mutation<User, CreateRequest>({
        query: (body) => ({
          url: "user/register",
          method: "POST",
          body,
          credentials: "include",
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
            document.cookie = "auth_session=; SameSite=Strict";
          } catch (err) {}
        },
      }),
      login: build.mutation<User, LoginRequest>({
        query: (body) => ({
          url: "user/login",
          method: "POST",
          body,
          credentials: "include",
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
        async onQueryStarted(_, { queryFulfilled }) {
          try {
            await queryFulfilled;
            document.cookie = "auth_session=; SameSite=Strict";
          } catch (err) {}
        },
      }),
      getUser: build.query<User, void>({
        query: () => ({ url: "user", credentials: "include" }),
        providesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
          } catch (err) {
            dispatch(clearUser());
          }
        },
      }),
      updateUser: build.mutation<User, UpdateRequest>({
        query: (body) => ({
          url: "user",
          method: "PATCH",
          body,
          credentials: "include",
        }),
        invalidatesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            dispatch(
              setAlert({
                type: "success",
                msg: "Profile updated!",
              })
            );
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
            document.cookie = "auth_session=; max-age=0; SameSite=Strict";
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
