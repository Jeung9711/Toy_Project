import { FcGoogle } from "react-icons/fc";
import { GoogleLoginButton } from "./styles/GoogleLoginButton";

const GoogleOAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:9000/auth/google";
  };

  return (
    <GoogleLoginButton onClick={handleGoogleLogin}>
      <FcGoogle />
      Google로 로그인
    </GoogleLoginButton>
  );
};

export default GoogleOAuthButton;
