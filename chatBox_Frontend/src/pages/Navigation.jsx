import React from "react";
import { Outlet } from "react-router-dom";
import "../cssFiles/Navigation.css";
import Sidebar from "../components/Sidebar";

function Navigation() {
  return (
    <main className="home">
      <Sidebar />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
}

export default Navigation;
