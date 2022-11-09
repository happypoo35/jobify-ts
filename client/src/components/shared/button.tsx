import s from "./button.module.scss";

const Button = ({ children }: { children: React.ReactNode }) => {
  return <button className={s.btn}>{children}</button>;
};

export default Button;
