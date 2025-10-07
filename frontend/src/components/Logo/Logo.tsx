import s from "./Logo.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../images/My Logo.png";
export default function Logo() {
  return (
    <>
      <NavLink to="/" className={s.logo}>
        <img src={logo} alt="logo" className={s.logoImg} />
      </NavLink>
    </>
  );
}
