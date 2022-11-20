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
  total: number;
  nHits: number;
  nPages: number;
  page: number;
  limit: number;
}

export interface JobsQuery {
  search: string;
  status: "all" | "interview" | "declined" | "pending";
  jobType: "all" | "full-time" | "part-time" | "remote" | "internship";
  sort: "latest" | "oldest" | "a-z" | "z-a";
  page: number;
  limit: number;
}

export type JobRequest = Omit<
  Job,
  "_id" | "createdAt" | "updatedAt" | "createdBy"
>;

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
      createJob: build.mutation<Job, JobRequest>({
        query: (body) => ({
          url: "jobs",
          method: "POST",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["Jobs", "Stats"],
      }),
      getAllJobs: build.query<JobsObj, Partial<JobsQuery>>({
        query: (params) => ({
          url: "jobs",
          params,
          credentials: "include",
        }),
        providesTags: ["Jobs"],
      }),
      getJob: build.query<Job, string>({
        query: (jobId) => ({
          url: `jobs/${jobId}`,
          credentials: "include",
        }),
        providesTags: ["Job"],
      }),
      updateJob: build.mutation<
        Job,
        { body: Partial<JobRequest>; jobId: string }
      >({
        query: ({ body, jobId }) => ({
          url: `jobs/${jobId}`,
          method: "PATCH",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["Jobs", "Job"],
      }),
      deleteJob: build.mutation<void, string>({
        query: (jobId) => ({
          url: `jobs/${jobId}`,
          method: "DELETE",
          credentials: "include",
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
