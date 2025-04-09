import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormWrapper,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
} from "./styles/FormStyles";
import { RegisterTitle } from "./styles/RegisterStyles";

const Registration = () => {
  const [currentData, setCurrentData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [signupError, setSignupError] = useState();
  const [signupSuccess, setSignupSuccess] = useState();
  const navigator = useNavigate();

  // 각 입력값 currentData에 저장
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name == "password") {
      checkPassword(value);
    }

    setCurrentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 서버 통신으로 유효성 검사 : username, email
  const checkID = async (type, value) => {
    if (!value) return;

    try {
      const res = await fetch(`http://localhost:9000/api/check-${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [type]: value }),
      });

      const data = await res.json();

      if (data.isDuplicated) {
        if (type === "username") {
          setUsernameError("이미 사용중인 아이디입니다.");
        } else if (type === " email") {
          setEmailError("이미 사용중인 이메일입니다.");
        }
      } else {
        if (type === "username") {
          setUsernameError("");
        } else if (type === "email") {
          setEmailError("");
        }
      }
    } catch (error) {
      console.error(`${type} 중복 확인 실패:`, error);
      if (type === "username") {
        setUsernameError("서버와의 통신에 실패했습니다.");
      } else if (type === " email") {
        setEmailError("서버와의 통신에 실패했습니다.");
      }
    }
  };

  // 비밀번호 유효성 검사
  const checkPassword = (value) => {
    if (value.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("비밀번호는 대문자를 최소 1개 포함해야 합니다.");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setPasswordError("비밀번호는 특수문자를 최소 1개 포함해야 합니다.");
    } else if (!/[0-9]/.test(value)) {
      setPasswordError("비밀번호는 숫자를 최소 1개 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  // 비밀번호 확인 검사
  const checkPasswordConfirmError = async (value) => {
    const password = currentData.password;

    if (password != value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      console.log("password:", password, "passwordConfirm:", value);
    } else {
      setPasswordConfirmError("");
    }
  };

  // 기존 데이터를 서버에 저장
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (isSigningUp) return; //중복 클릭 방지
    setIsSigningUp(true);
    setSignupError("");
    setSignupSuccess("");

    // 유효성 검사
    await checkUsername(currentData.username);
    checkPassword(currentData.password);
    checkEmail(currentData.email);
    await checkPasswordConfirmError(currentData.passwordConfirm);

    // 서버에 POST 요청
    try {
      const res = await fetch("http://localhost:9000/register", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentData.username,
          email: currentData.email,
          password: currentData.password,
          nickname: currentData.nickname,
        }),
      });

      if (res.ok) {
        setSignupSuccess("회원가입이 완료되었습니다!");
        setCurrentData({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
          nickname: "",
        });
        setTimeout(() => {
          navigator("/lognin-page");
        }, 2000);
      } else {
        setSignupError(res.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setSignupError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormWrapper>
      <RegisterTitle>회원가입</RegisterTitle>
      <form onSubmit={handleSignupSubmit} method="POST">
        <Label htmlFor="sign_id">아이디</Label>
        <Input
          className="sign_id"
          type="text"
          id="sign_id"
          name="username"
          value={signData.username}
          placeholder="사용할 아이디를 입력하세요"
          onChange={handleChange}
          onBlur={checkUsername}
        ></Input>
        {usernameError != "" ? (
          <ErrorMessage>{usernameError}</ErrorMessage>
        ) : null}

        <Label htmlFor="sign_email">이메일</Label>
        <Input
          className="sign_email"
          type="email"
          id="sign_email"
          name="email"
          value={signData.email}
          placeholder="이메일을 입력하세요"
          onChange={handleChange}
          onBlur={(e) => checkEmail(e.target.value)}
        ></Input>
        {emailError != "" ? <ErrorMessage>{emailError}</ErrorMessage> : null}

        <Label htmlFor="sign_pw">비밀번호</Label>
        <Input
          className="sign_pw"
          type="password"
          id="sign_pw"
          name="password"
          value={signData.password}
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
        ></Input>
        {passwordError != "" ? (
          <ErrorMessage>{passwordError}</ErrorMessage>
        ) : null}

        <Label htmlFor="sign_pw_check">비밀번호 확인</Label>
        <Input
          className="sign_pw_check"
          type="password"
          id="sign_pw_check"
          name="passwordConfirm"
          value={signData.passwordConfirm}
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleChange}
          onBlur={(e) => {
            checkPasswordConfirmError(e.target.value);
          }}
        ></Input>
        {passwordConfirmError != "" ? (
          <ErrorMessage>{passwordConfirmError}</ErrorMessage>
        ) : null}

        <Label htmlFor="sign_nickname">닉네임</Label>
        <Input
          className="sign_nickname"
          type="text"
          id="sign_nickname"
          name="nickname"
          value={signData.nickname}
          placeholder="표시할 닉네임을 입력하세요"
          onChange={handleChange}
        ></Input>

        <SubmitButton
          type="submit"
          onClick={handleSignupSubmit}
          disabled={isSigningUp}
        >
          {isSigningUp ? "가입 중..." : "회원가입"}
        </SubmitButton>
      </form>
      <Link to="/login-page">이미 계정이 있으신가요? 로그인</Link>
      {signupError && <ErrorMessage>{signupError}</ErrorMessage>}
      {signupSuccess && <SuccessMessage>{signupSuccess}</SuccessMessage>}
    </FormWrapper>
  );
};

export default Registration;
