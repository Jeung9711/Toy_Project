import styled from "styled-components";

export const GoogleLoginButton = styled.button`
    margin-top: 1rem;
  padding: 10px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background: white;
  color: #444;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
`;
