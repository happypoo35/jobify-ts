import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";

import {
  selectLimit,
  selectPage,
  setLimit,
  setPage,
} from "@/features/global.slice";

import { SORT_OPTS, STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { useAppDispatch, useAppSelector, useDebounce } from "@/hooks";
import { Input } from "../shared";
import { Select } from "../shared/input";
import { ButtonInline } from "../shared/button";

import s from "./filters.module.scss";

type FormValues = {
  search: string;
  status: "all" | "interview" | "declined" | "pending";
  jobType: "all" | "full-time" | "part-time" | "remote" | "internship";
  sort: "latest" | "oldest" | "a-z" | "z-a";
  page: number;
  limit: number;
};

interface Props {
  jobsCount: number;
  pageCount: number;
  page: number;
  limit: number;
}

const Filters = ({ jobsCount = 0, pageCount = 0, page, limit }: Props) => {
  const [params, setParams] = useSearchParams();
  const queryParams = Object.fromEntries(params);

  // const dispatch = useAppDispatch();
  // const page = useAppSelector(selectPage);
  // const limit = useAppSelector(selectLimit);

  const defaultValues: FormValues = {
    search: queryParams.search,
    status: STATUS_OPTS.includes(queryParams.status)
      ? (queryParams.status as FormValues["status"])
      : "all",
    jobType: TYPE_OPTS.includes(queryParams.jobType)
      ? (queryParams.jobType as FormValues["jobType"])
      : "all",
    sort: SORT_OPTS.includes(queryParams.sort)
      ? (queryParams.sort as FormValues["sort"])
      : "latest",
    page,
    limit,
  };

  const { register, control, setValue, reset } = useForm<FormValues>({
    defaultValues,
  });

  const values = useWatch({ control });
  // console.log(values);

  const debouncedSearch = useDebounce(values.search);

  useEffect(() => {
    setParams(
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
  }, [debouncedSearch, values.search, setParams]);

  const setURLParam = (key: string, value: string) => {
    params.set(key, value);
    setParams(params, { replace: true });
  };

  // useEffect(() => {
  //   setParams(
  //     {
  //       ...(debouncedSearch && values.search && { search: debouncedSearch }),
  //       ...(values.status !== "all" && { status: values.status }),
  //       ...(values.jobType !== "all" && { jobType: values.jobType }),
  //       ...(values.sort !== "latest" && { sort: values.sort }),
  //     },
  //     { replace: true }
  //   );
  // }, [debouncedSearch, values, setParams]);

  // useEffect(() => {
  //   const { search, page, limit, ...rest } = values;

  //   // const queryObj: { [P in keyof FormValues]?: FormValues[P] } = {};
  //   const queryObj: { [P in keyof FormValues]?: string } = {};

  //   if (debouncedSearch && search) {
  //     queryObj.search = debouncedSearch;
  //   }

  //   (Object.keys(rest) as (keyof typeof rest)[]).map((el) => {
  //     if (["all", "latest"].indexOf(rest[el] as string) === -1) {
  //       queryObj[el] = rest[el];
  //     }
  //     return null;
  //   });

  //   if (page && page !== 1) {
  //     queryObj.page = String(page);
  //   }

  //   setParams(queryObj);
  // }, [setParams, values, debouncedSearch]);

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
    // dispatch(setPage(1));
    // dispatch(setLimit(null));
    setParams("", { replace: true });
    reset({
      search: "",
      status: "all",
      jobType: "all",
      sort: "latest",
      page,
      limit,
    });
  };

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
          {jobsCount > 0
            ? `${jobsCount} job${jobsCount !== 1 && "s"} found`
            : "no jobs to display"}
        </span>
        <ButtonInline type="button" onClick={handleReset}>
          Clear filters
        </ButtonInline>
      </div>
    </div>
  );
};
export default Filters;
