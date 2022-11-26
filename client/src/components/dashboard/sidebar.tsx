import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  FiPieChart,
  FiUser,
  FiFilePlus,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

import { useOutsideClick } from "@/hooks";
import { Logo } from "../shared";

import s from "./sidebar.module.scss";

const navItems = [
  {
    name: "Stats",
    slug: "stats",
    icon: <FiPieChart />,
  },
  {
    name: "All Jobs",
    slug: "jobs",
    icon: <FiLayers />,
  },
  {
    name: "Add Job",
    slug: "job",
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
  handleLogout: () => Promise<void>;
}

const Sidebar = ({ sidebar, setSidebar, tablet, handleLogout }: Props) => {
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
          <div>
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
          </div>
          {tablet && (
            <span onClick={handleLogout}>
              <FiLogOut />
              Logout
            </span>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
