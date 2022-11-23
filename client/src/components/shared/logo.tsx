import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as JobifyLogo } from "@/assets/logo.svg";

const Logo = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      to="/"
      aria-label="Jobify logo/ link to main page"
      style={{ fontSize: "3.125rem" }}
      {...props}
    >
      <JobifyLogo />
    </Link>
  );
};

export default Logo;
