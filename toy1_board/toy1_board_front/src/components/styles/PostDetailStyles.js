import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 70%;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

export const TitleContainer = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  padding: 20px; /* 내부 여백 */
  margin-bottom: 20px; /* 아래쪽 여백 */
  background-color: #fff; /* 배경색 */
  border-radius: 8px; /* 테두리 둥글게 */
`;

// 제목 스타일 (큰 폰트로 강조)
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 20px; /* 제목 위 여백 추가 */
  margin-bottom: 16px;
  padding-top: 20px;
  padding-bottom: 10px;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #007bff; /* 파란색 구분선 */
`;

// 작성자 및 날짜 정보 스타일
export const PostMeta = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start; /* 오른쪽 정렬 */
  font-size: 1rem;
  color: #777;
`;

// 본문 내용 스타일
export const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap; /* 줄바꿈 처리 */
  min-height: 300px; /* 글이 길어지더라도 일정 크기 유지 */
  overflow-y: auto; /* 내용이 넘치면 스크롤바 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9; /* 배경색 */
`;

// 댓글 영역을 위한 스타일 (나중에 댓글 추가 시 사용)
export const CommentSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

// 각 댓글 스타일 (미리보기용)
export const Comment = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// 댓글 작성자 및 날짜
export const CommentMeta = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 5px;
`;

// 댓글 내용
export const CommentContent = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
`;
