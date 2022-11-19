import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSelector } from "react-redux";
import { selectUser } from "@/features/user.slice";
import {
  JobRequest,
  useCreateJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
} from "@/app/jobs.api";

import { Input, Button, Select, Form } from "../shared";
import { STATUS_OPTS, TYPE_OPTS } from "@/utils/constants";
import { useAlert } from "@/hooks";
import { ButtonInline } from "../shared/button";

import s from "./job.module.scss";

const AddJob = ({ isEdit }: { isEdit?: boolean }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { alert, setAlert } = useAlert();

  const user = useSelector(selectUser);
  const { data: job, isError: isInvalidJobId } = useGetJobQuery(jobId!, {
    skip: !isEdit || !jobId,
  });
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const schema = yup.object().shape({
    position: yup
      .string()
      .required("Can not be empty")
      .max(100, "Can not be more than 100 characters"),
    company: yup
      .string()
      .required("Can not be empty")
      .max(50, "Can not be more than 50 characters"),
    jobLocation: yup
      .string()
      .required("Can not be empty")
      .max(20, "Can not be more than 20 characters"),
    status: yup.string().required("Can not be empty"),
    jobType: yup.string().required("Can not be empty"),
  });

  const defaultValues = useMemo(
    () => ({
      position: isEdit && job ? job.position : "",
      company: isEdit && job ? job.company : "",
      status: isEdit && job ? job.status : "pending",
      jobType: isEdit && job ? job.jobType : "full-time",
      jobLocation: isEdit && job ? job.jobLocation : user?.location ?? "",
    }),
    [user?.location, isEdit, job]
  );

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<JobRequest>({ resolver: yupResolver(schema), defaultValues });

  const values = useWatch({ control });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onCreate = async (data: JobRequest) => {
    try {
      await createJob(data).unwrap();
      setAlert({ isSuccess: true, message: "Job created!" });
      setTimeout(() => navigate("/jobs"), 1000);
    } catch (err: any) {
      if (err.data?.errors) {
        err.data.errors.map((el: { key: keyof JobRequest; msg: string }) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
      setAlert({ isSuccess: false, message: "Failure" });
    }
  };

  const onUpdate = async (data: JobRequest) => {
    if (!jobId) return;
    try {
      await updateJob({ body: data, jobId }).unwrap();
      setAlert({ isSuccess: true, message: "Job updated!" });
      setTimeout(() => navigate("/jobs"), 1000);
    } catch (err: any) {
      if (err.data?.errors) {
        err.data.errors.map((el: { key: keyof JobRequest; msg: string }) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
      setAlert({ isSuccess: false, message: "Failure" });
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
  };

  if (isInvalidJobId) return <Navigate to="/dashboard/error" replace />;

  return (
    <section className={s.job}>
      <Form onSubmit={handleSubmit(isEdit ? onUpdate : onCreate)}>
        <h2 data-h3>{isEdit ? "Edit Job" : "Add job"}</h2>
        <section>
          <Input
            label="position"
            error={errors.position?.message}
            {...register("position")}
          />
          <Input
            label="company"
            error={errors.company?.message}
            {...register("company")}
          />
          <Input
            label="location"
            error={errors.jobLocation?.message}
            {...register("jobLocation")}
          />
          <Select
            name="status"
            options={STATUS_OPTS}
            error={errors.status?.message}
            selected={values.status}
            setValue={setValue}
            register={register}
          />
          <Select
            name="jobType"
            label="type"
            options={TYPE_OPTS}
            error={errors.jobType?.message}
            selected={values.jobType}
            setValue={setValue}
            register={register}
          />
          <div data-buttons>
            <Button
              type="submit"
              alert={alert}
              isLoading={isEdit ? isUpdating : isCreating}
              disabled={!isDirty}
            >
              Save changes
            </Button>
            <ButtonInline type="reset" onClick={handleReset}>
              {isEdit ? "Reset changes" : "Reset form"}
            </ButtonInline>
          </div>
        </section>
      </Form>
    </section>
  );
};
export default AddJob;
