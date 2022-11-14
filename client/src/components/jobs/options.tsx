import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";

import { useDeleteJobMutation, usePrefetch } from "@/app/jobs.api";

import { useOutsideClick } from "@/hooks";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";

import s from "./options.module.scss";

const Options = ({ jobId }: { jobId: string }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const optionsRef = useRef(null);

  useOutsideClick(optionsRef, () => setShow(false));

  const [deleteJob, { isLoading, isSuccess }] = useDeleteJobMutation();
  const prefetchJob = usePrefetch("getJob");

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);
    } catch (err) {}
  };

  return (
    <div className={s.options} ref={optionsRef}>
      <button
        className={s.btn}
        aria-label="toggle-menu"
        onClick={() => setShow((p) => !p)}
      >
        <FiMoreVertical />
      </button>
      <div className={s.dropdown} data-active={show || undefined} role="menu">
        <span
          onClick={() => navigate(`/dashboard/add-job/${jobId}`)}
          onMouseEnter={() => prefetchJob(jobId)}
        >
          <FiEdit /> Edit
        </span>
        <span onClick={handleDelete}>
          {isLoading || isSuccess ? (
            <>
              <Spinner /> Deleting...
            </>
          ) : (
            <>
              <FiTrash2 /> Delete
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Options;
