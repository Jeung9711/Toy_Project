import React from "react";
import "../components/style/MenuSection.css";

const MenuSection = ({ brandName, theme, menus, onMenuClick }) => {
  return (
    <div className="menu-section">
      <h2 className="menu-theme">
        {brandName}의 신메뉴 테마는 "{theme}" 입니다!
      </h2>
      <div className="menu-grid">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="menu-card"
            onClick={() => onMenuClick(menu)}
          >
            <img src={menu.image} alt={menu.name} />
            <h3>{menu.name}</h3>
            <p>{menu.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
