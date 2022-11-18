import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { usePrefetch } from "@/app/jobs.api";
import { usePagination, useMediaQuery } from "@/hooks";

import s from "./pagination.module.scss";

const Pagination = ({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mobile = useMediaQuery("(max-width: 576px)");
  const pages = usePagination({
    pageCount,
    currentPage,
    siblingCount: mobile ? 0 : 1,
  });

  const prefetchPage = usePrefetch("getAllJobs");

  const handlePrefetchPage = (page: number) => {
    if (page > 0 && page <= pageCount) {
      const query = Object.fromEntries(searchParams);
      if (page === 1) {
        delete query.page;
      } else {
        query.page = String(page);
      }
      prefetchPage(query);
    }
  };

  const handleSetPage = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      handleSetPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSetPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className={s.container}>
      <button
        className={s.arrow}
        onClick={handlePrevPage}
        onMouseEnter={() => handlePrefetchPage(currentPage - 1)}
      >
        <FiArrowLeft />
      </button>
      {pages?.map((el, id) => {
        if (el === "dots") {
          return <span key={id}>&#8230;</span>;
        }
        return (
          <button
            key={id}
            className={s.btn}
            data-active={el === currentPage || undefined}
            onClick={() => typeof el === "number" && handleSetPage(el)}
            onMouseEnter={() =>
              typeof el === "number" && handlePrefetchPage(el)
            }
          >
            {el}
          </button>
        );
      })}
      <button
        className={s.arrow}
        onClick={handleNextPage}
        onMouseEnter={() => handlePrefetchPage(currentPage + 1)}
      >
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
