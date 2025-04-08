import { useEffect, useState } from "react";
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
  const [signData, setSignData] = useState([]);
  const [currentData, setCurrentData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [signupError, setSignupError] = useState();
  const [signupSuccess, setSignupSuccess] = useState();
  const navigator = useNavigate();

  // 기존의 로컬 스토리지에 있던 userData를 저장
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userData"));
    if (saved) setSignData(saved);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setCurrentData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name == "password") {
      checkPassword(value);
    }
  };

  // 각 변수에 대한 유효성 검사
  const checkUsername = async (value) => {
    const storeUserData = JSON.parse(localStorage.getItem("userData"));

    if (storeUserData && storeUserData.username === value) {
      setUsernameError("이미 사용중인 아이디입니다.");
    } else {
      setUsernameError("");
    }
  };

  const checkEmail = (value) => {
    if (!/@/.test(value)) {
      setEmailError("유효하지 않은 이메일 형식입니다.");
    } else {
      setEmailError("");
    }
  };

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

  const checkPasswordConfirmError = async (value) => {
    const password = currentData.password;

    if (password != value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      console.log("password:", password, "passwordConfirm:", value);
    } else {
      setPasswordConfirmError("");
    }
  };

  // 제출에 대한 동작 코드
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

    // currentData 저장
    // setState가 비동기 처리되어 빈 배열이 업로드, 이를 막기위해 변수로 저장
    const updateData = [...signData, currentData];
    setSignData(updateData);
    setCurrentData({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    });

    // 오류 발생 시 중단
    if (
      usernameError !== "" ||
      emailError !== "" ||
      passwordError !== "" ||
      passwordConfirmError !== ""
    ) {
      // setSignupError('입력한 정보를 다시 확인해주세요.');
      setIsSigningUp(false);
    }

    // 로컬 스토리지에 저장
    try {
      localStorage.setItem("userData", JSON.stringify(updateData));
      setSignupSuccess("회원가입이 완료되었습니다!");
      console.log("가입성공", updateData);
      // 회원가입에서 로그인 페이지로 연결
      setTimeout(() => {
        navigator("/login-page");
      }, 2000);
    } catch (error) {
      setSignupError("저장 중 오류가 발생하였습니다.");
      console.log("가입 실패");
    }

    setIsSigningUp(false);
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
