import { useSelector } from "react-redux";
import { selectUser } from "@/features/user.slice";

import Dashboard from "../dashboard";
import Landing from "../landing";

const Main = () => {
  const user = useSelector(selectUser);

  if (!user) return <Landing />;

  return <Dashboard />;
};
// const Main = () => {
//   const user = useSelector(selectUser);
//   const isAuth = document.cookie.includes("auth_session");

//   const { refetch } = useGetUserQuery(undefined, {
//     skip: !isAuth,
//   });

//   useEffect(() => {
//     if (!isAuth) return;
//     if (!user) refetch();
//   }, [isAuth, user, refetch]);

//   if (!user && !isAuth) return <Landing />;

//   return <Dashboard />;
// };

export default Main;
