import styled from "styled-components";

export const PostContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 50px;
  // align-items: center;
  // display: flex;
  // flex-direction: column;
  // margin-top: 70px;
  // gap: 1rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 35px;
`;

export const StyledButton = styled.button`
  padding: 6px 12px;
  align-items: center;
  background-color: #007bff; /* 회원가입/로그아웃에서 쓰던 색 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PostRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  align-items: center;

  &.header {
    background-color: #f1f3f5;
    font-weight: bold;
    // border-top: 2px solid #007bff;
  }

  &.data {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }
  }
  // display: grid;
  // grid-template-columns: 1fr 4fr 1fr;
  // padding: 0.8rem 1.2rem;
  // border: 1px solid #ccc;
  // border-radius: 8px;
  // background: #fafafa;
  // text-align: center;
  // align-items: center;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Column = styled.div`
  padding: 12px 16px;
  font-size: 1rem;

  &:nth-child(1) {
    flex: 1;
    text-align: center;
  }

  &:nth-child(2) {
    flex: 4;
    text-align: left;
    cursor: pointer;
  }

  &:nth-child(3) {
    flex: 1;
    text-align: center;
  }
`;
