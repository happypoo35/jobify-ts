import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FiPieChart, FiUser, FiFilePlus, FiLayers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useOutsideClick } from "@/hooks";
import { Logo } from "../shared";

import s from "./sidebar.module.scss";

const navItems = [
  {
    name: "Stats",
    slug: ".",
    icon: <FiPieChart />,
  },
  {
    name: "All Jobs",
    slug: "all-jobs",
    icon: <FiLayers />,
  },
  {
    name: "Add Job",
    slug: "add-job",
    icon: <FiFilePlus />,
  },
  {
    name: "Profile",
    slug: "profile",
    icon: <FiUser />,
  },
];

interface SidebarObj {
  active: boolean;
  animateOnClose: boolean;
}

interface Props {
  sidebar: SidebarObj;
  setSidebar: Dispatch<SetStateAction<SidebarObj>>;
  tablet: boolean;
}

const Sidebar = ({ sidebar, setSidebar, tablet }: Props) => {
  const sidebarRef = useRef(null);

  const handleClose = () => {
    setSidebar((p) => ({ ...p, animateOnClose: true }));
  };

  useOutsideClick(sidebarRef, () => {
    if (!tablet || !sidebar.active) return;
    handleClose();
  });

  useEffect(() => {
    tablet
      ? setSidebar({ active: false, animateOnClose: false })
      : setSidebar({ active: true, animateOnClose: false });
  }, [tablet, setSidebar]);

  return (
    <aside
      className={s.sidebar}
      data-active={sidebar.active || undefined}
      data-animate={sidebar.animateOnClose || undefined}
    >
      <div
        className={s.content}
        ref={sidebarRef}
        onAnimationEnd={() =>
          sidebar.animateOnClose &&
          setSidebar({ active: false, animateOnClose: false })
        }
      >
        <header>
          <Logo />
        </header>
        <nav>
          {navItems.map((el, id) => (
            <NavLink
              to={el.slug}
              end
              key={id}
              className={({ isActive }) => (isActive ? s.active : undefined)}
              onClick={() => tablet && handleClose()}
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
