import { Params, redirect } from "react-router-dom";
import { authApi } from "@/app/auth.api";
import { jobsApi } from "@/app/jobs.api";
import store from "@/app/store";

export const rootLoader = async () => {
  if (document.cookie.includes("auth_session")) {
    const promise = store.dispatch(authApi.endpoints.getUser.initiate());
    await promise;

    promise.unsubscribe();
  }
};

export const authLoader = () => {
  if (document.cookie.includes("auth_session")) throw redirect("/");
};

export const protectLoader = () => {
  if (!document.cookie.includes("auth_session")) throw redirect("/login");
};

export const jobsLoader = async () => {
  const promise = store.dispatch(jobsApi.endpoints.getAllJobs.initiate({}));
  await promise;

  promise.unsubscribe();
};

export const jobLoader = async ({ params }: { params: Params }) => {
  if (params.jobId) {
    const promise = store.dispatch(
      jobsApi.endpoints.getJob.initiate(params.jobId)
    );
    await promise;
  }
};
