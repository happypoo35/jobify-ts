import { forwardRef, InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import s from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<FieldValues>>
>(({ error, label, ...props }, ref) => {
  return (
    <div className={s.field} data-error={error}>
      <input {...props} ref={ref} id={`${props.name}-input`} placeholder=" " />
      <label htmlFor={`${props.name}-input`}>{label}</label>
      {error && error !== ` ` && <span className={s.error}>{error}</span>}
    </div>
  );
});

// export const Selector = forwardRef(
//   ({ error, label, setValue, options, ...props }, ref) => {
//     const selectRef = useRef();
//     const [show, setShow] = useState(false);
//     const { field } = useController(props);

//     useOutsideClick(selectRef, () => setShow(false));

//     return (
//       <div
//         className={`field select${error ? " error" : ""}${
//           show ? " active" : ""
//         }`}
//         onClick={() => setShow((p) => !p)}
//         ref={selectRef}
//       >
//         <input
//           ref={ref}
//           {...field}
//           id={`${field.name}-input`}
//           placeholder=" "
//         />
//         <label htmlFor={`${field.name}-input`}>{label}</label>
//         <FiChevronDown className="select-arrow" />
//         {error && error !== ` ` && <span className="error-msg">{error}</span>}
//         <ul className="select-dropdown" role="listbox">
//           {options.map((el, id) => (
//             <li
//               key={id}
//               className={`select-dropdown-item${
//                 el === field.value ? " active" : ""
//               }`}
//               onClick={() => setValue(field.name, el)}
//             >
//               {el}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// );

export default Input;
