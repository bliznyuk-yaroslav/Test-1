import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
}
