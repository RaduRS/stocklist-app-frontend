import React, { useState } from "react";
import "./Sidebar.scss";
import logoSmall from "../../assets/logo-small.jpg";
import menuBars from "../../assets/paragraph.png";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div
            className="logo"
            style={{ display: isOpen ? "block" : "none" }}
            onClick={goHome}
          >
            <img src={logoSmall} alt="logo" style={{ cursor: "pointer" }} />
          </div>
          <div className="bars">
            <img
              onClick={toggle}
              src={menuBars}
              alt="menu"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
