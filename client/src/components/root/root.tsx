import { selectUser } from "@/features/user.slice";
import { useAppSelector } from "@/hooks";

import Dashboard from "../dashboard";
import Landing from "../landing";

const Main = () => {
  const user = useAppSelector(selectUser);

  if (!user) return <Landing />;

  return <Dashboard />;
};

export default Main;
