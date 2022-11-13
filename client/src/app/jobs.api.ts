import { api } from "./api";
import { setAlert } from "@/features/global.slice";

export const jobsApi = api
  .enhanceEndpoints({
    addTagTypes: ["Jobs", "Job", "Stats"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createJob: build.mutation({
        query: (body) => ({
          url: "jobs",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Jobs", "Stats"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            dispatch(
              setAlert({
                type: "success",
                msg: "Job created!",
              })
            );
          } catch (err) {}
        },
      }),
      getAllJobs: build.query({
        query: (search) => `jobs${search && `?${search}`}`,
        providesTags: ["Jobs"],
      }),
      getJob: build.query({
        query: (jobId) => `jobs/${jobId}`,
        providesTags: ["Job"],
      }),
      updateJob: build.mutation({
        query: ({ body, jobId }) => ({
          url: `jobs/${jobId}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Jobs", "Job"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            dispatch(
              setAlert({
                type: "success",
                msg: "Job updated!",
              })
            );
          } catch (err) {}
        },
      }),
      deleteJob: build.mutation({
        query: (jobId) => ({
          url: `jobs/${jobId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Jobs", "Stats"],
      }),
      getStats: build.query({
        query: () => "jobs/stats",
        providesTags: ["Stats"],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetStatsQuery,
} = jobsApi;
