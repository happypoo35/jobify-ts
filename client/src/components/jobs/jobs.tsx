import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { JobsQuery, useGetAllJobsQuery } from "@/app/jobs.api";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import Filters from "./filters";
import Card from "./card";
import Pagination from "./pagination";
import EmptyJobs from "./emptyJobs";
import Loader from "./loader";

import s from "./jobs.module.scss";

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );
  const [params, setParams] = useState<Partial<JobsQuery>>({});

  const { data, isLoading, isFetching } = useGetAllJobsQuery(params);

  useEffect(() => {
    const obj: Record<string, string> = {};
    if (queryParams.search) {
      obj.search = queryParams.search;
    }
    if (queryParams.status && STATUS_OPTS.includes(queryParams.status)) {
      obj.status = queryParams.status;
    }
    if (queryParams.jobType && TYPE_OPTS.includes(queryParams.jobType)) {
      obj.jobType = queryParams.jobType;
    }
    if (queryParams.sort && SORT_OPTS.slice(1).includes(queryParams.sort)) {
      obj.sort = queryParams.sort;
    }
    if (queryParams.page && queryParams.page !== "1") {
      obj.page = queryParams.page;
    }

    setSearchParams(obj, { replace: true });
    setParams(obj);
  }, [queryParams, setSearchParams]);

  if (!data) {
    return <Loader />;
  }

  if (data.total === 0) {
    return <EmptyJobs />;
  }

  return (
    <section className={s.section}>
      <Filters
        jobsCount={data?.nHits}
        page={data?.page}
        limit={data?.limit}
        params={params}
      />
      <section className={s.list} role="list">
        {(isLoading || isFetching) && <Loader data-cover />}
        {data?.jobs.map((el) => (
          <Card key={el._id} job={el} />
        ))}
      </section>
      {data?.nPages > 1 && (
        <Pagination pageCount={data?.nPages} currentPage={data?.page} />
      )}
    </section>
  );
};

export default Jobs;
