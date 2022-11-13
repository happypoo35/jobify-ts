import { selectAlert } from "@/features/global.slice";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Link, LinkProps } from "react-router-dom";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import { FiCheckCircle } from "react-icons/fi";

import s from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  isLoading?: boolean;
}

interface ButtonLinkProps extends LinkProps {
  variant?: string;
}

const Button: React.FC<PropsWithChildren & ButtonProps> = ({
  children,
  variant,
  isLoading,
  ...props
}) => {
  const alert = useSelector(selectAlert);

  const message = isLoading ? (
    <>
      <Spinner /> Processing...
    </>
  ) : alert ? (
    <>
      <FiCheckCircle /> {alert.msg}
    </>
  ) : (
    children
  );

  return (
    <button
      className={s.btn}
      data-loading={isLoading || undefined}
      data-variant={variant}
      {...props}
    >
      {message}
    </button>
  );
};

export const ButtonLink: React.FC<PropsWithChildren & ButtonLinkProps> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <Link className={s.btn} data-variant={variant} {...props}>
      {children}
    </Link>
  );
};

export default Button;
