import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "page/Login";
import Registration from "page/Registration";
import Landing from "page/Landing";
import PostDetailPage from "page/PostDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 루트 경로 */}
        <Route path="/" element={<Login />}></Route>

        <Route path="/login-page" element={<Login />}></Route>
        <Route path="/registration-page" element={<Registration />}></Route>
        <Route path="/landing-page" element={<Landing />}></Route>
        <Route path="/posts/:id" element={<PostDetailPage />}></Route>

        {/* 그 외 모든 경로 */}
        <Route path="*" element={<Navigate to="/login-page" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
