import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import s from "./button.module.scss";

const Button: React.FC<
  PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button className={s.btn} {...props}>
      {children}
    </button>
  );
};

export default Button;
