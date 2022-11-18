import { useSearchParams } from "react-router-dom";
// import Pagination from "./Pagination";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import Filters from "./filters";
import Card from "./card";

import { useGetAllJobsQuery } from "@/app/jobs.api";

import s from "./jobs.module.scss";
import { useEffect, useMemo, useState } from "react";
// import { useQueryParams } from "@/hooks";

const Jobs = () => {
  const [params, setParams] = useSearchParams();
  const queryParams = useMemo(() => Object.fromEntries(params), [params]);
  const [query, setQuery] = useState({});

  const { data, isLoading, isFetching } = useGetAllJobsQuery(
    // Object.fromEntries(params)
    query
  );

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

    setQuery(obj);
  }, [queryParams]);

  return (
    <section className={s.section}>
      <Filters
        jobsCount={data?.nHits}
        pageCount={data?.nPages}
        page={data?.page}
        limit={data?.limit}
        query={query}
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
