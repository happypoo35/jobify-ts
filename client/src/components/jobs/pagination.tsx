import { useEffect } from "react";
import { usePagination, useWindowSize } from "hooks";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "app/slice.global";
import { usePrefetch } from "@/app/jobs.api";

const Pagination = ({ pageCount }: { pageCount: number }) => {
  const [searchParams] = useSearchParams();
  const { mobile } = useWindowSize();
  const currentPage = useSelector(selectPage);
  const pages = usePagination({
    pageCount,
    currentPage,
    siblingCount: mobile ? 0 : 1,
  });

  const dispatch = useDispatch();
  const prefetchPage = usePrefetch("getAllJobs");

  const handlePrefetchPage = (page) => {
    if (page > 0 && page <= pageCount) {
      searchParams.set("page", page);
      const search = searchParams.toString();
      prefetchPage(search);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="pagination">
      <button
        className="pagination-arrow"
        onClick={handlePrevPage}
        onMouseEnter={() => handlePrefetchPage(currentPage - 1)}
      >
        <FiArrowLeft />
      </button>
      {pages.map((el, id) => {
        if (el === "dots") {
          return (
            <span key={id} className="dots">
              &#8230;
            </span>
          );
        }
        return (
          <button
            key={id}
            className={`pagination-btn ${el === currentPage ? "active" : ""}`}
            onClick={() => dispatch(setPage(el))}
            onMouseEnter={() => handlePrefetchPage(el)}
          >
            {el}
          </button>
        );
      })}
      <button
        className="pagination-arrow"
        onClick={handleNextPage}
        onMouseEnter={() => handlePrefetchPage(currentPage + 1)}
      >
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
