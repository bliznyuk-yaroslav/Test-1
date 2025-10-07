import Logo from "../Logo/Logo.tsx";
import NavBar from "../NavBar/NavBar.tsx";
import s from "./Header.module.scss";
import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <header className={s.header} data-aos="zoom-out-left">
      <Logo />
      <NavBar />
    </header>
  );
}
