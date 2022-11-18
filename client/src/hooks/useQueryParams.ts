import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Params {
  key: string;
  opts?: string[];
}

// const testParams = [
//   {
//     key: "status",
//     opts: ["1", "2", "3"],
//   },
//   {
//     key: "jobType",
//     opts: ["1", "2", "3"],
//   },
// ];

const useQueryParams = (params: Params[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const searchObj = Object.fromEntries(searchParams);
  const [query, setQuery] = useState({});

  // useEffect(() => {
  //   params.map((param) => {
  //     if (
  //       searchObj[param.key] &&
  //       param.opts &&
  //       !param.opts.includes(searchObj[param.key])
  //     ) {
  //       console.log("map");

  //       setSearchParams(
  //         (p) => {
  //           p.delete(param.key);
  //           return p;
  //         },
  //         { replace: true }
  //       );
  //     }

  //     return null;
  //   });
  //   console.log("output");
  //   // setQuery(searchObj);

  //   // setQuery(searchObj);
  //   // setSearchParams(searchParams, { replace: true });
  // }, [searchObj, setSearchParams, params]);

  // return searchObj;
  return query;
};

export default useQueryParams;
