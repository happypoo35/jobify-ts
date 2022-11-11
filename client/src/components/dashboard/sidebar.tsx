import { Dispatch, SetStateAction, useRef } from "react";
import { FiPieChart, FiUser, FiFilePlus, FiLayers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useOutsideClick, useWindowSize } from "@/hooks";
import { Logo } from "../shared";

const navItems = [
  {
    name: "Stats",
    url: ".",
    icon: <FiPieChart />,
  },
  {
    name: "All Jobs",
    url: "all-jobs",
    icon: <FiLayers />,
  },
  {
    name: "Add Job",
    url: "add-job",
    icon: <FiFilePlus />,
  },
  {
    name: "Profile",
    url: "profile",
    icon: <FiUser />,
  },
];

import s from "./sidebar.module.scss";

interface Props {
  isSidebar: boolean;
  setIsSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebar, setIsSidebar }: Props) => {
  const sidebarRef = useRef(null);
  const { tablet } = useWindowSize();

  useOutsideClick(sidebarRef, () => {
    if (!tablet) return;
    console.log("hello");
  });

  return (
    <aside
      className={s.sidebar}
      data-active={isSidebar || undefined}
      ref={sidebarRef}
    >
      <div className={s.content}>
        <header>
          <Logo />
        </header>
        <nav>
          {navItems.map((el, id) => (
            <NavLink
              to={el.url}
              end
              key={id}
              className={({ isActive }) => (isActive ? s.active : undefined)}
              // onClick={() => tablet && dispatch(toggleSidebar(false))}
            >
              {el.icon}
              {el.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
