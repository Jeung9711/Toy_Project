import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 20px 30px 70px;
  margin: 0 auto;
  border-bottom: 2px solid #007bff;
`;

export const Title = styled.h1`
  flex: 1;
  font-size: 1.8rem;
  margin: 0;
  text-align: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Nickname = styled.span`
  font-weight: bold;
  color: #333;
`;

export const LogoutButton = styled.button`
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #d32f2f;
  }
`;
