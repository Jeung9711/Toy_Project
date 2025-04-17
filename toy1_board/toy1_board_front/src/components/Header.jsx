import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  Title,
  UserInfo,
  Nickname,
  LogoutButton,
} from "./styles/Header";
import { useDispatch } from "react-redux";
import { clearUser } from "features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 리덕스 추가하기
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    dispatch(clearUser());
    console.log("리덕스 클리어");
    localStorage.removeItem("nickname");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Title>글 목록</Title>
      <UserInfo>
        <Nickname>{nickname}님</Nickname>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </UserInfo>
      <hr></hr>
    </HeaderContainer>
  );
};

export default Header;
