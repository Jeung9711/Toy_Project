import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  Title,
  UserInfo,
  Nickname,
  LogoutButton,
} from "./styles/Header";

const Header = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    localStorage.removeItem("nickname");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Title>기본 페이지</Title>
      <UserInfo>
        <Nickname>{nickname}님</Nickname>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </UserInfo>
      <hr></hr>
    </HeaderContainer>
  );
};

export default Header;
