import { useRef, useState } from "react";
import {
  FieldValues,
  UseFormSetValue,
  Path,
  UseFormRegister,
  FieldPathValue,
} from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

import { useOutsideClick } from "@/hooks";

import sInput from "./input.module.scss";
import s from "./select.module.scss";

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  options: string[];
  label?: string;
  error?: string;
  selected?: string;
  variant?: string;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  setURLParam?: (key: string, value: string) => void;
};

const Select = <T extends FieldValues>({
  name,
  options,
  label,
  error,
  selected,
  variant,
  setValue,
  register,
  setURLParam,
}: SelectProps<T>) => {
  const [show, setShow] = useState(false);
  const selectRef = useRef(null);

  useOutsideClick(selectRef, () => setShow(false));

  const setSelected = (el: FieldPathValue<T, Path<T>>) => {
    setValue(name, el, { shouldDirty: true });
    setURLParam?.(name, el);
  };

  return (
    <div
      className={[sInput.field, s.select].join(" ")}
      data-error={error}
      data-variant={variant}
      data-active={show || undefined}
      onClick={() => setShow((p) => !p)}
      ref={selectRef}
    >
      <input {...register(name)} id={`${name}-input`} placeholder=" " />
      <label htmlFor={`${name}-input`}>{label || name}</label>
      <FiChevronDown className={s.arrow} />
      {error && error !== ` ` && <em>{error}</em>}
      <ul className={s.dropdown} role="listbox">
        {options.map((el, id) => (
          <li
            key={id}
            className={s.item}
            data-active={el === selected || undefined}
            onClick={() => setSelected(el as FieldPathValue<T, Path<T>>)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
