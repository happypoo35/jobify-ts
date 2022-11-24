import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { useDebounce } from "@/hooks";
import { Input, Select } from "../shared";
import { ButtonInline } from "../shared/button";

import { JobsQuery } from "@/app/jobs.api";

import s from "./filters.module.scss";

interface Props {
  jobsCount: number;
  page: number;
  limit: number;
  params: Partial<JobsQuery>;
}

const Filters = ({
  jobsCount = 0,
  page,
  limit,
  params,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = useMemo(
    () => ({
      search: params.search || "",
      status: params.status || "all",
      jobType: params.jobType || "all",
      sort: params.sort || "latest",
      page,
      limit,
    }),
    [params, page, limit]
  );

  const { register, control, setValue, reset } = useForm<JobsQuery>({
    defaultValues,
  });

  const values = useWatch({ control });
  // console.log(values);

  const debouncedSearch = useDebounce(values.search);

  useEffect(() => {
    setSearchParams(
      (p) => {
        if (debouncedSearch && values.search) {
          p.set("search", debouncedSearch);
        } else {
          p.delete("search");
        }
        return p;
      },
      { replace: true }
    );
  }, [debouncedSearch, values.search, setSearchParams]);

  const setURLParam = (key: string, value: string) => {
    if (!["all", "latest"].includes(value)) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleReset = () => {
    reset({
      search: "",
      status: "all",
      jobType: "all",
      sort: "latest",
      page,
      limit,
    });
    setSearchParams("", { replace: true });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const resultsText = (
    <span>
      Displaying{" "}
      <b>
        {(page - 1) * limit + 1}-
        {page * limit < jobsCount ? page * limit : jobsCount}
      </b>{" "}
      of {jobsCount} job{jobsCount !== 1 ? "s" : ""} found
    </span>
  );

  return (
    <div className={s.container}>
      <form>
        <Input label="search" autoComplete="off" {...register("search")} />
        <Select
          name="status"
          options={["all", ...STATUS_OPTS]}
          selected={values.status}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
        />
        <Select
          name="jobType"
          label="type"
          options={["all", ...TYPE_OPTS]}
          selected={values.jobType}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
        />
        <Select
          name="sort"
          options={SORT_OPTS}
          selected={values.sort}
          setValue={setValue}
          register={register}
          setURLParam={setURLParam}
        />
      </form>
      <div className={s.stats}>
        <span>
          {jobsCount > 0 ? <FiEye /> : <FiEyeOff />}
          {jobsCount > 0 ? resultsText : "no jobs to display"}
        </span>
        <ButtonInline type="button" onClick={handleReset}>
          Clear filters
        </ButtonInline>
      </div>
    </div>
  );
};
export default Filters;
