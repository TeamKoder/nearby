import React from "react";

const Sidebar = (props) => {
  const { active } = props;
  return (
    <>
      <div className={!active ? "_sidebar" : "_sidebar _sidebar-active"}>
        <div className="_slidebar-logo text-center">
          <span className="px-4 py-2 rounded-pill">NE&Delta;RBY</span>
        </div>
        <div className="_sidebat-menu">
          <ul>
            <li className="_sidebar-menu-active">HOME</li>
            <li>PROFILE</li>
            <li>FEEDBACK</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
