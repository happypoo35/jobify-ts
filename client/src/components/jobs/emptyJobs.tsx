import { ReactComponent as Empty } from "@/assets/empty.svg";
import { ButtonLink } from "../shared/button";

import { useCreateMockJobsMutation } from "@/app/jobs.api";

import s from "./emptyJobs.module.scss";

const EmptyJobs = () => {
  const [createMockJobs, { isLoading, isSuccess }] =
    useCreateMockJobsMutation();

  const onClick = async () => {
    if (!isLoading || !isSuccess) {
      await createMockJobs();
    }
  };

  return (
    <section className={s.section}>
      <Empty />
      <article>
        <h2 data-h3>Nothing to show</h2>
        <p>
          You haven't added any jobs yet. Start by creating a new job or{" "}
          <u onClick={onClick}>add mock jobs</u>
        </p>
      </article>
      <ButtonLink to="/job">Create your first job</ButtonLink>
    </section>
  );
};

export default EmptyJobs;
