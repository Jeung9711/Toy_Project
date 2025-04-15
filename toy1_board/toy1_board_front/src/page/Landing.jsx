import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/user/userSlice";

const Landing = () => {
  // 현재 페이지의 url 정보를 담는 객체
  const location = useLocation();
  const nickname = useSelector((state) => state.user.nickname); // 항상 컴포넌트 최상단에서 호출
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 새로고침에도 리덕스에 닉네임 저장
  useEffect(() => {
    const storeNickname = localStorage.getItem("nickname");
    if (storeNickname && !nickname) {
      dispatch(setUser({ nickname: storeNickname }));
    }
  }, [dispatch, nickname]); //nickname 변경 시에만 실행

  useEffect(() => {
    console.log("리덕스로 받은 닉네임", nickname);

    // 닉네임 변경시 저장하고 페이지 이동
    if (nickname && localStorage.getItem("nickname" !== nickname)) {
      localStorage.setItem("nickname", nickname);
      // 헤더 렌더링을 유도 -> 무한로딩 걸려서 변경
      navigate("/landing-page");
    }
  }, [nickname, navigate]);

  return (
    <div>
      <Header></Header>
      <PostList></PostList>
    </div>
  );
};

export default Landing;
