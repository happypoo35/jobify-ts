import { forwardRef, useRef, useState } from "react";
import { useOutsideClick } from "hooks";
import { FiChevronDown } from "react-icons/fi";
import { useController } from "react-hook-form";

const Selector = forwardRef(
  ({ error, label, setValue, options, ...props }, ref) => {
    const selectRef = useRef();
    const [show, setShow] = useState(false);
    const { field } = useController(props);

    useOutsideClick(selectRef, () => setShow(false));

    return (
      <div
        className={`field select${error ? " error" : ""}${
          show ? " active" : ""
        }`}
        onClick={() => setShow((p) => !p)}
        ref={selectRef}
      >
        <input
          ref={ref}
          {...field}
          id={`${field.name}-input`}
          placeholder=" "
        />
        <label htmlFor={`${field.name}-input`}>{label}</label>
        <FiChevronDown className="select-arrow" />
        {error && error !== ` ` && <span className="error-msg">{error}</span>}
        <ul className="select-dropdown" role="listbox">
          {options.map((el, id) => (
            <li
              key={id}
              className={`select-dropdown-item${
                el === field.value ? " active" : ""
              }`}
              onClick={() => setValue(field.name, el)}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Selector;
