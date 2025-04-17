import { useEffect, useState } from "react";
import {
  ButtonContainer,
  Column,
  PostContainer,
  PostRow,
  StyledButton,
} from "components/styles/PostList";
import { Link, useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:9000/posts");
    const data = await res.json();
    setPosts(data);
    console.log(data);
  };

  return (
    <PostContainer>
      <ButtonContainer>
        <StyledButton onClick={() => navigate("/posts/new")}>
          새 글 작성
        </StyledButton>
      </ButtonContainer>

      <PostRow className="header">
        <Column>번호</Column>
        {/* <Column>Id</Column> */}
        <Column>제목</Column>
        <Column>작성자</Column>
      </PostRow>

      {posts.map((data, index) => {
        return (
          <PostRow className="data">
            <Column>{index + 1}</Column>
            {/* <Column>{data.id}</Column> */}
            <Column key={data.id} onClick={() => navigate(`/posts/${data.id}`)}>
              {data.title}
            </Column>
            <Column>{data.author}</Column>
          </PostRow>
        );
      })}
    </PostContainer>
  );
};

export default PostList;
