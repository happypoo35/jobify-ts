import { useSearchParams } from "react-router-dom";
// import Pagination from "./Pagination";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import Filters from "./filters";
import Card from "./card";

import { useGetAllJobsQuery } from "@/app/jobs.api";

import s from "./jobs.module.scss";
import { useEffect, useState } from "react";

const Jobs = () => {
  const [params, setParams] = useSearchParams();
  const [skip, setSkip] = useState(true);
  console.log(skip);

  const { data, isLoading, isFetching } = useGetAllJobsQuery(
    Object.fromEntries(params),
    { skip }
  );

  useEffect(() => {
    setSkip(true);
    const queryParams = Object.fromEntries(params);
    if (!STATUS_OPTS.includes(queryParams.status)) {
      params.delete("status");
    }
    if (!TYPE_OPTS.includes(queryParams.jobType)) {
      params.delete("jobType");
    }
    if (!SORT_OPTS.slice(1).includes(queryParams.sort)) {
      params.delete("sort");
    }
    setParams(params, { replace: true });
    setSkip(false);
  }, [params, setParams]);

  return (
    <section className={s.section}>
      <Filters
        jobsCount={data?.nHits}
        pageCount={data?.nPages}
        page={data?.page}
        limit={data?.limit}
      />
      <section className={s.list} role="list">
        {(isLoading || isFetching) && (
          <div className={s.cover}>
            <Spinner style={{ fontSize: "3rem" }} />
          </div>
        )}
        {data?.jobs.map((el) => (
          <Card key={el._id} job={el} />
        ))}
      </section>
      {/* {data?.nPages > 1 && <Pagination pageCount={data.nPages} />} */}
    </section>
  );
};

export default Jobs;
