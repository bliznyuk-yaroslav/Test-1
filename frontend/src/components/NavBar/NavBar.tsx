import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.scss";

type NavItem = {
  label: string;
  path: string; // перейменував href на path для консистентності з роутером
};

export default function NavBar() {
  const navItems: NavItem[] = [
    { label: "Квізи", path: "/quiz" },
    { label: "Створити квіз", path: "/quizCreation" },
  ];

  return (
    <nav className={s.nav}>
      {navItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          className={({ isActive }) =>
            isActive ? `${s.navItem} ${s.active}` : s.navItem
          }
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
