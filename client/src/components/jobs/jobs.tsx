import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import Filters from "./filters";
import Card from "./card";
import Pagination from "./pagination";

import { useGetAllJobsQuery } from "@/app/jobs.api";

import s from "./jobs.module.scss";

const Jobs = () => {
  const [params, setParams] = useSearchParams();
  const queryParams = useMemo(() => Object.fromEntries(params), [params]);
  const [query, setQuery] = useState({});

  const { data, isLoading, isFetching } = useGetAllJobsQuery(query);

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

    setParams(obj);
    setQuery(obj);
  }, [queryParams, setParams]);

  if (!data) {
    return null;
  }

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
      {data?.nPages > 1 && (
        <Pagination pageCount={data?.nPages} currentPage={data?.page} />
      )}
    </section>
  );
};

export default Jobs;
