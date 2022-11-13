import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import s from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

interface ButtonLinkProps extends LinkProps {
  variant?: string;
}

const Button: React.FC<PropsWithChildren & ButtonProps> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <button className={s.btn} data-variant={variant} {...props}>
      {children}
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
