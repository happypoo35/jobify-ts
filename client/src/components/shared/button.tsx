import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import { ReactComponent as Spinner } from "@/assets/spinner.svg";
import { Alert } from "@/hooks/useAlert";

import s from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  alert?: Alert;
}

interface ButtonLinkProps extends LinkProps {
  variant?: string;
}

const Button: React.FC<PropsWithChildren & ButtonProps> = ({
  children,
  variant,
  isLoading,
  alert,
  ...props
}) => {
  const message = isLoading ? (
    <>
      <Spinner /> Processing...
    </>
  ) : alert ? (
    <>
      {alert.isSuccess ? <FiCheckCircle /> : <FiAlertCircle />} {alert.message}
    </>
  ) : (
    children
  );

  return (
    <button
      className={s.btn}
      data-loading={isLoading || undefined}
      data-success={alert ? alert.isSuccess : undefined}
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
