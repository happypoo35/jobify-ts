import { ReactComponent as NotFound } from "@/assets/not-found.svg";
import { ButtonLink } from "../shared/button";

import s from "./error.module.scss";

const Error = () => {
  return (
    <main className={s.error} data-container>
      <NotFound />
      <div>
        <h1 data-h3>Ohh! Page not found</h1>
        <p>We cant' seem to find the page you're looking for</p>
        <ButtonLink to="/">Back home</ButtonLink>
      </div>
    </main>
  );
};
export default Error;
