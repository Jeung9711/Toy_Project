import React from "react";
import "../components/style/RecommendMenuSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecommendMenuSection = ({ recommendedMenus, currentIndex, setIndex }) => {
  const visibleItems = 5;
  const handlePrev = () =>
    setIndex(
      (prev) => (prev - 1 + recommendedMenus.length) % recommendedMenus.length
    );
  const handleNext = () =>
    setIndex((prev) => (prev + 1) % recommendedMenus.length);

  const visible = [
    { image: "https://source.unsplash.com/100x100/?drink,watermelon" },
    { image: "https://source.unsplash.com/100x100/?smoothie,fruit" },
    { image: "https://source.unsplash.com/100x100/?coffee,cup" },
    { image: "https://source.unsplash.com/100x100/?latte,art" },
    { image: "https://source.unsplash.com/100x100/?matcha,drink" },
    { image: "https://source.unsplash.com/100x100/?bubbletea" },
    { image: "https://source.unsplash.com/100x100/?strawberry,drink" },
    { image: "https://source.unsplash.com/100x100/?lemonade" },
    { image: "https://source.unsplash.com/100x100/?blueberry,drink" },
    { image: "https://source.unsplash.com/100x100/?mint,drink" },
  ];
  for (let i = 0; i < visibleItems; i++) {
    visible.push(
      recommendedMenus[(currentIndex + i) % recommendedMenus.length]
    );
  }

  return (
    <div className="recommend-section">
      <h3 className="recommend-title">비슷한 테마의 추천 메뉴</h3>
      <div className="recommend-carousel">
        <FaChevronLeft className="arrow" onClick={handlePrev} />
        <div className="recommend-logos">
          {visible.map((item, idx) => (
            <img
              key={idx}
              src={item.image}
              alt="추천메뉴"
              className={`recommend-img ${idx === 2 ? "highlight" : ""}`}
            />
          ))}
        </div>
        <FaChevronRight className="arrow" onClick={handleNext} />
      </div>
    </div>
  );
};

export default RecommendMenuSection;
