import styled from "styled-components";

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PostRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 2fr 1fr;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Column = styled.div`
  font-size: 1rem;
`;
