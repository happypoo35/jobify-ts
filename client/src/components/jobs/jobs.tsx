import { useSearchParams } from "react-router-dom";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import Card from "./card";
import Filters from "./filters";
// import Pagination from "./Pagination";

import { useGetAllJobsQuery } from "@/app/jobs.api";

import s from "./jobs.module.scss";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isFetching } = useGetAllJobsQuery(
    /* searchParams.toString() */
    {test: 'test'}
  );

  return (
    <section className={s.section}>
      {data && <Filters jobsCount={data.nHits} pageCount={data.nPages} />}
      <section className={s.list} role="list">
        {isFetching && (
          <div className={s.cover}>
            <Spinner style={{ fontSize: "3rem" }} />
          </div>
        )}
        {isLoading ? (
          <Spinner style={{ fontSize: "3rem" }} />
        ) : (
          data?.jobs.map((el) => <Card key={el._id} job={el} />)
        )}
      </section>
      {/* {data?.nPages > 1 && <Pagination pageCount={data.nPages} />} */}
    </section>
  );
};

export default Jobs;
