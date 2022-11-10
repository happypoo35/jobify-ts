import { FormHTMLAttributes, PropsWithChildren } from "react";

import s from "./form.module.scss";

const Form: React.FC<
  PropsWithChildren & FormHTMLAttributes<HTMLFormElement>
> = ({ children, ...props }) => {
  return (
    <form className={s.form} noValidate {...props}>
      {children}
    </form>
  );
};

export default Form;
