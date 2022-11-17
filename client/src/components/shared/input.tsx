import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseControllerProps,
  useController,
  Path,
  UseFormRegister,
  FieldPathValue,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

import { useOutsideClick } from "@/hooks";

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
        {error && error !== ` ` && <span className={s.error}>{error}</span>}
      </div>
    );
  }
);

// interface SelectProps<T extends FieldValues> {
//   label: string;
//   error?: string;
//   options: string[];
//   setValue: UseFormSetValue<T>;
// }

// export const Select = <T extends FieldValues>({
//   error,
//   label,
//   setValue,
//   options,
//   ...props
// }: SelectProps<T> & UseControllerProps<T>) => {
//   const [show, setShow] = useState(false);
//   const { field } = useController(props);
//   const selectRef = useRef(null);

//   useOutsideClick(selectRef, () => setShow(false));

//   return (
//     <div
//       className={[s.field, s.select].join(" ")}
//       data-error={error}
//       data-active={show || undefined}
//       onClick={() => setShow((p) => !p)}
//       ref={selectRef}
//     >
//       <input {...field} id={`${field.name}-input`} placeholder=" " />
//       <label htmlFor={`${field.name}-input`}>{label}</label>
//       <FiChevronDown className={s.arrow} />
//       {error && error !== ` ` && <span className={s.error}>{error}</span>}
//       <ul className={s.dropdown} role="listbox">
//         {options.map((el, id) => (
//           <li
//             key={id}
//             className={s.item}
//             data-active={el === field.value || undefined}
//             onClick={() => setValue(field.name, el as typeof field.value)}
//           >
//             {el}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: string[];
  label?: string;
  error?: string;
  selected?: string;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  setURLParam?: (key: string, value: string) => void;
};

export const Select = <T extends FieldValues>({
  name,
  options,
  label,
  error,
  selected,
  setValue,
  register,
  setURLParam,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);
  const selectRef = useRef(null);

  useOutsideClick(selectRef, () => setShow(false));

  const setSelected = (el: FieldPathValue<T, Path<T>>) => {
    setValue(name, el);
    setURLParam?.(name, el);
  };

  return (
    <div
      className={[s.field, s.select].join(" ")}
      data-error={error}
      data-active={show || undefined}
      onClick={() => setShow((p) => !p)}
      ref={selectRef}
    >
      <input {...register(name)} id={`${name}-input`} placeholder=" " />
      <label htmlFor={`${name}-input`}>{label || name}</label>
      <FiChevronDown className={s.arrow} />
      {error && error !== ` ` && <span className={s.error}>{error}</span>}
      <ul className={s.dropdown} role="listbox">
        {options.map((el, id) => (
          <li
            key={id}
            className={s.item}
            data-active={el === selected || undefined}
            // onClick={() => setValue(name, el as FieldPathValue<T, Path<T>>)}
            onClick={() => setSelected(el as FieldPathValue<T, Path<T>>)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
