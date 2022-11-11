import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import s from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const Button: React.FC<PropsWithChildren & Props> = ({
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

export default Button;
