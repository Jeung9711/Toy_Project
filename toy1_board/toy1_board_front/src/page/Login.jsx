import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormWrapper,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from "../components/styles/FormStyles";
import { LoginTitle } from "../components/styles/LoginStyles";
import GoogleOAuthButton from "../components/GoogleOAuthButton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, SetIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  // 리덕스를 위한 설정
  const nickname = useSelector((state) => state.user.nickname);
  const dispatch = useDispatch();

  // 새로고침해도 리덕스에 닉네임 저장
  useEffect(() => {
    const nickname = localStorage.getItem("nickname");
    if (nickname) {
      dispatch(setUser({ nickname }));
    }
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (isLoggingIn) return;
    SetIsLoggingIn(true);

    // 로그인 - 백엔드
    try {
      // 백엔드 서버로 로그인 요청
      const res = await fetch(
        `http://localhost:9000/login?username=${loginId}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", //JSON 형식으로 요청
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(setUser({ id: data.id, nickname: data.nickname }));
        localStorage.setItem("nickname", data.nickname);
        console.log("로그인 성공", data);
        setTimeout(() => {
          navigate("/landing-page");
        }, 1000);
      } else {
        setLoginError(data.message || "아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      setLoginError("서버와의 연결에 실패했습니다.");
    }

    SetIsLoggingIn(false);
  };

  return (
    <FormWrapper>
      <LoginTitle>로그인</LoginTitle>
      <form onSubmit={handleLoginSubmit} method="">
        <Label htmlFor="login_id">아이디</Label>
        <Input
          className="login_id"
          type="text"
          id="login_id"
          name="id"
          value={loginId}
          placeholder="아이디 또는 이메일을 입력하세요"
          onChange={(e) => setLoginId(e.target.value)}
        ></Input>
        <Label htmlFor="login_pw">비밀번호</Label>
        <Input
          className="login_pw"
          type="password"
          id="login_pw"
          name="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        <SubmitButton
          type="submit"
          onClick={handleLoginSubmit}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "로그인 중..." : "로그인"}
        </SubmitButton>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      </form>
      <Link to="/registration-page">아직 계정이 없으신가요? 회원가입</Link>
      <GoogleOAuthButton />
    </FormWrapper>
  );
};

export default Login;
