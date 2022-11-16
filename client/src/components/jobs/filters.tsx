// import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
// import { useDebounce } from "hooks";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";

import { useForm, useWatch, FieldValues } from "react-hook-form";

import {
  selectLimit,
  selectPage,
  setLimit,
  setPage,
} from "@/features/global.slice";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { Input } from "../shared";
import { Select } from "../shared/input";

type FormValues = {
  search: string;
  status: string;
  jobType: string;
  sort: string;
};

const Filters: React.FC<{ jobsCount: number; pageCount: number }> = ({
  jobsCount,
  pageCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const defaultValues = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  };

  const { register, control, setValue, reset } = useForm<FieldValues>({
    defaultValues,
  });

  const values = useWatch({ control });
  console.log(values);

  // const debouncedSearch = useDebounce(values.search);

  // useEffect(() => {
  //   const { search, ...rest } = values;
  //   const searchValues = Object.keys(rest).reduce((acc, el) => {
  //     if (rest[el] !== "all" && rest[el] !== "latest") {
  //       acc[el] = rest[el];
  //     }
  //     return acc;
  //   }, {});

  //   if (debouncedSearch) {
  //     searchValues.search = debouncedSearch;
  //   }

  //   if (page > 1) {
  //     searchValues.page = page;
  //   }

  //   if (limit) {
  //     searchValues.limit = limit;
  //   }

  //   setSearchParams(searchValues);
  // }, [setSearchParams, values, debouncedSearch, page, limit]);

  // useEffect(() => {
  //   if (page > pageCount) {
  //     dispatch(setPage(1));
  //   }
  // }, [page, pageCount, dispatch]);

  const handleReset = () => {
    dispatch(setPage(1));
    dispatch(setLimit(null));
    reset();
  };

  return (
    <div className="filters-container">
      <form className="filters">
        <Input label="search" autoComplete="off" {...register("search")} />
        <Select
          name="status"
          label="status"
          options={["all", ...STATUS_OPTS]}
          setValue={setValue}
          control={control}
        />
        <Select
          name="jobType"
          label="type"
          options={["all", ...TYPE_OPTS]}
          setValue={setValue}
          control={control}
        />
        <Select
          name="sort"
          label="sort"
          options={SORT_OPTS}
          setValue={setValue}
          control={control}
        />
      </form>
      <div className="filters-stats">
        {jobsCount > 0 ? (
          <span className="count">
            <FiEye />
            {jobsCount} {jobsCount === 1 ? "job" : "jobs"} found
          </span>
        ) : (
          <span className="count">
            <FiEyeOff />
            no jobs to display
          </span>
        )}
        <button type="button" className="btn-inline" onClick={handleReset}>
          Clear filters
        </button>
      </div>
    </div>
  );
};
export default Filters;
