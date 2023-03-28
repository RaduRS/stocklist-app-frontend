import React, { useState } from "react";
import arrow from "../../assets/arrow.png";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const activeSublink = ({ isActive }) => (isActive ? "active" : "link");

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent "
        }
      >
        <div
          className="sidebar-title"
          onClick={() => setExpandMenu(!expandMenu)}
        >
          <span>
            {item.icon && (
              <div className="icon">
                <img src={item.icon} alt={item.title} />
              </div>
            )}
            {isOpen && <div>{item.title}</div>}
          </span>
          {isOpen && <img src={arrow} alt="arrow" className="arrow-icon" />}
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div className="s-child" key={index}>
                <NavLink to={child.path} className={activeSublink}>
                  {isOpen && (
                    <div className="sidebar-item">
                      <div className="sidebar-title">
                        <span>
                          {child.icon && (
                            <div className="icon">{child.icon}</div>
                          )}
                          <div>{child.title}</div>
                        </span>
                      </div>
                    </div>
                  )}
                  {!isOpen && (
                    <div className="sidebar-item sidebar-closed-item">
                      <div className="sidebar-title">
                        <span>
                          {child.icon && (
                            <div className="icon">{child.icon}</div>
                          )}
                          <div>{child.title}</div>
                        </span>
                      </div>
                    </div>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && (
                <div className="icon">
                  <img src={item.icon} alt={item.title} />
                </div>
              )}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
