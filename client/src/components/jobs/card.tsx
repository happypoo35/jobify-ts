import { FiNavigation, FiCalendar, FiBriefcase } from "react-icons/fi";

import { Job } from "@/app/jobs.api";

import { useLocale } from "@/hooks";
import CardOptions from "./cardOptions";

import s from "./card.module.scss";

const Card = ({ job }: { job: Job }) => {
  const localeDate = useLocale({});

  const {
    position,
    company,
    jobLocation: location,
    createdAt,
    jobType: type,
    status,
    _id: jobId,
  } = job;

  return (
    <article className={s.card}>
      <header>
        <div className={s.title}>
          <div className={s.icon}>{company.split("")[0]}</div>
          <div className={s.text}>
            <h2 data-h5 title={position}>
              {position}
            </h2>
            <p title={company}>{company}</p>
          </div>
        </div>
        <CardOptions jobId={jobId} />
      </header>
      <div className={s.content}>
        <div className={s.item}>
          <FiNavigation />
          <span title={location}>{location}</span>
        </div>
        <div className={s.item}>
          <FiCalendar />
          <span>{localeDate(createdAt)}</span>
        </div>
        <div className={s.item}>
          <FiBriefcase />
          <span>{type}</span>
        </div>
        <div className={s.status} data-status={status}>
          {status}
        </div>
      </div>
    </article>
  );
};

export default Card;
