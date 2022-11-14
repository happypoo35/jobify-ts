import { useSelector } from "react-redux";
import { selectUser } from "@/features/user.slice";

import Dashboard from "../dashboard";
import Landing from "../landing";

const Main = () => {
  const user = useSelector(selectUser);

  if (!user) return <Landing />;

  return <Dashboard />;
};

export default Main;
