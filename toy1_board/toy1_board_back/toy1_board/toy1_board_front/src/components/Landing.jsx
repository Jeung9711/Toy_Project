import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";

const Landing = () => {
  // 현재 페이지의 url 정보를 담는 객체
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const nickname = query.get("nickname");
    console.log("쿼리로 받은 닉네임", nickname);

    if (nickname) {
      localStorage.setItem("nickname", nickname);
      // 헤더 렌더링을 유도
      window.location.replace("/landing-page");
    }
  }, [location]);

  return <Header></Header>;
};

export default Landing;
