import { PropsWithChildren } from "react";

import s from "./formContainer.module.scss";

const FormContainer: React.FC<
  PropsWithChildren & React.HTMLAttributes<HTMLElement>
> = ({ children, className, ...props }) => {
  return (
    <section className={`${s.container} ${className}`} {...props}>
      {children}
    </section>
  );
};

export default FormContainer;
