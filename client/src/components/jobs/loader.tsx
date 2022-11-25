import { HTMLAttributes } from "react";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";

import s from "./loader.module.scss";

const Loader = (props: HTMLAttributes<Element>) => {
  return (
    <div className={s.loading} {...props}>
      <Spinner style={{ fontSize: "3rem" }} />
    </div>
  );
};

export default Loader;
