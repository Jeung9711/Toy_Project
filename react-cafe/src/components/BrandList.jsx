import megaLogo from "../assets/megacoffee.png";
import starbucksLogo from "../assets/starbucks.png";
import theVentiLogo from "../assets/theVenti.png";
import tenpercentLogo from "../assets/tenpercent.png";
import ediyaLogo from "../assets/ediya.png";
import gamsungcoffeeLogo from "../assets/gamsungcoffee.png";
import paikdabangLogo from "../assets/paikdabang.png";
import gongchaLogo from "../assets/gongcha.png";
import composeLogo from "../assets/compose.png";

import "../components/style/BrandList.css";
import { useState } from "react";

const brands = [
  {
    name: "메가커피",
    image: megaLogo,
    url: "https://www.mega-mgccoffee.com/",
  },
  {
    name: "스타벅스",
    image: starbucksLogo,
    url: "https://www.starbucks.co.kr/index.do",
  },
  { name: "더 벤티", image: theVentiLogo, url: "https://www.theventi.co.kr" },
  {
    name: "공차",
    image: gongchaLogo,
    url: "https://www.gong-cha.co.kr/brand/",
  },
  {
    name: "컴포즈커피",
    image: composeLogo,
    url: "https://composecoffee.com/",
  },
  { name: "빽다방", image: paikdabangLogo, url: "https://paikdabang.com/" },
];

function BrandList() {
  const [startIndex, setStartIndex] = useState(0);

  const getVisibleBrands = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      // % brands.length 배열의 범위를 벗어나지 않도록(=원형 구조)
      visible.push(brands[(startIndex + i) % brands.length]);
    }
    return visible;
  };

  const next = () => {
    setStartIndex((prev) => (prev + 1) % brands.length);
  };

  const prev = () => {
    // 음수를 방지하기 위해 나누는 수와 같은 값을 더해줌, 결과는 변화x
    setStartIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  return (
    <div className="BrandList-wrapper">
      <button onClick={prev} className="arrow">
        {"<"}
      </button>
      <div className="BrandList">
        {getVisibleBrands().map((brand, index) => {
          return (
            <a
              key={index}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              // 정중앙의 선택된 브랜드라면 center-highlight 추가
              className={`brand-item ${index === 2 ? "center-highlight" : ""}`}
            >
              <img src={brand.image} alt={brand.name}></img>
            </a>
          );
        })}
      </div>
      <button onClick={next} className="arrow">
        {">"}
      </button>
    </div>
  );
}

export default BrandList;
