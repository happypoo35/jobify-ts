import { useNavigation } from "react-router-dom";
import s from "./loader.module.scss";

const Loader = () => {
  const { state } = useNavigation();

  if (state === "loading")
    return (
      <div className={s.loader}>
        <div />
      </div>
    );

  return null;
};

export default Loader;
