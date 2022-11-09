import { forwardRef } from "react";

import s from "./field.module.scss";

const Field = forwardRef<HTMLInputElement, { error?: string; label: string }>(
  ({ error, label, ...props }, ref) => {
    return (
      <div
        /* className={`field ${error ? "error" : ""}`} */ className={s.field}
        data-error={error}
      >
        <input
          ref={ref}
          {...props}
          id={`${props.name}-input`}
          placeholder=" "
        />
        <label htmlFor={`${props.name}-input`}>{label}</label>
        {error && error !== ` ` && <span className={s.error}>{error}</span>}
      </div>
    );
  }
);

export default Field;
