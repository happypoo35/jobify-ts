import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

import { useOutsideClick } from "@/hooks";

import s from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface SelectProps<T extends FieldValues> {
  label: string;
  error?: string;
  options: string[];
  setValue: UseFormSetValue<T>;
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
        {error && error !== ` ` && <span className={s.error}>{error}</span>}
      </div>
    );
  }
);

export const Select = <T extends FieldValues>({
  error,
  label,
  setValue,
  options,
  ...props
}: SelectProps<T> & UseControllerProps<T>) => {
  const [show, setShow] = useState(false);
  const { field } = useController(props);
  const selectRef = useRef(null);

  useOutsideClick(selectRef, () => setShow(false));

  return (
    <div
      className={[s.field, s.select].join(" ")}
      data-error={error}
      data-active={show || undefined}
      onClick={() => setShow((p) => !p)}
      ref={selectRef}
    >
      <input {...field} id={`${field.name}-input`} placeholder=" " />
      <label htmlFor={`${field.name}-input`}>{label}</label>
      <FiChevronDown className={s.arrow} />
      {error && error !== ` ` && <span className={s.error}>{error}</span>}
      <ul className={s.dropdown} role="listbox">
        {options.map((el, id) => (
          <li
            key={id}
            className={s.item}
            data-active={el === field.value || undefined}
            onClick={() => setValue(field.name, el as typeof field.value)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
