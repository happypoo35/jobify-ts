import { Outlet } from "react-router-dom";
import { FormContainer, Logo } from "../shared";

import s from "./layout.module.scss";

const Layout = () => {
  return (
    <main className={s.main} data-container>
      <FormContainer className={s.card}>
        <Logo />
        <Outlet />
      </FormContainer>
    </main>
  );
};

export default Layout;
