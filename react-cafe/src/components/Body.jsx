import { useEffect, useState } from "react";
import { brands, dummyMenus } from "../components/dumydata";
import BrandList from "../components/BrandList";
import MenuSection from "../components/MenuSection";

function Body() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [menus, setMenus] = useState([]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (selectedBrand) {
      setMenus(dummyMenus[selectedBrand.name] || []);
      setTheme(selectedBrand.theme || "상큼한 과일");
    }
  }, [selectedBrand]);

  const handleMenuClick = (menu) => {
    // 모달 오픈 등 처리
    console.log("메뉴 클릭:", menu);
  };

  return (
    <div>
      <BrandList brands={brands} onSelectBrand={setSelectedBrand} />
      {selectedBrand && (
        <MenuSection
          brandName={selectedBrand.name}
          theme={theme}
          menus={menus}
          onMenuClick={handleMenuClick}
        />
      )}
    </div>
  );
}

export default Body;
