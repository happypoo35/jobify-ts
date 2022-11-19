import { forwardRef, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import s from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps & UseFormRegisterReturn>(
  ({ error, label, ...props }, ref) => {
    return (
      <div className={s.field} data-error={error}>
        <input
          {...props}
          ref={ref}
          id={`${props.name}-input`}
          placeholder=" "
        />
        <label htmlFor={`${props.name}-input`}>{label}</label>
        {error && error !== ` ` && <em>{error}</em>}
      </div>
    );
  }
);

export default Input;
