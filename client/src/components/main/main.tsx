import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/app/auth.api";
import { selectUser } from "@/features/user.slice";
import Dashboard from "../dashboard";
import Landing from "../landing";
import { useEffect } from "react";

const Main = () => {
  const user = useSelector(selectUser);
  const isAuth = document.cookie.includes("auth_session");

  const { refetch } = useGetUserQuery(undefined, {
    skip: !isAuth,
  });

  useEffect(() => {
    if (!isAuth) return;
    if (!user) refetch();
  }, [isAuth, user, refetch]);

  if (!user && !isAuth) return <Landing />;

  return <Dashboard />;
};

export default Main;
