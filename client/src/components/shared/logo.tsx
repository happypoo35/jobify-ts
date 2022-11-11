import { Link } from "react-router-dom";
import { ReactComponent as JobifyLogo } from "@/assets/logo.svg";
import { AnchorHTMLAttributes, SVGAttributes } from "react";

const Logo = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link to="/" {...props}>
      <JobifyLogo />
    </Link>
  );
};

export default Logo;
