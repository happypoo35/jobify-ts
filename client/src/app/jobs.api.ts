import { URLSearchParams } from "url";
import { api } from "./api";

export interface Job {
  _id: string;
  company: string;
  position: string;
  status: "interview" | "declined" | "pending";
  jobType: "full-time" | "part-time" | "remote" | "internship";
  jobLocation: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobsObj {
  jobs: Job[];
  nHits: number;
  nPages: number;
}

export interface Stats {
  monthlyApplications: { date: string; count: number }[];
  stats: { pending?: number; interview?: number; declined?: number };
}

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
        // async onQueryStarted(_, { queryFulfilled, dispatch }) {
        //   try {
        //     await queryFulfilled;
        //     dispatch(
        //       setAlert({
        //         type: "success",
        //         msg: "Job created!",
        //       })
        //     );
        //   } catch (err) {}
        // },
      }),
      getAllJobs: build.query<JobsObj, any>({
        query: (search) => ({
          url: "jobs",
          params: search,
          credentials: "include",
        }),
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
        // async onQueryStarted(_, { queryFulfilled, dispatch }) {
        //   try {
        //     await queryFulfilled;
        //     dispatch(
        //       setAlert({
        //         type: "success",
        //         msg: "Job updated!",
        //       })
        //     );
        //   } catch (err) {}
        // },
      }),
      deleteJob: build.mutation({
        query: (jobId) => ({
          url: `jobs/${jobId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Jobs", "Stats"],
      }),
      getStats: build.query<Stats, void>({
        query: () => ({
          url: "jobs/stats",
          credentials: "include",
        }),
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
  usePrefetch,
} = jobsApi;
