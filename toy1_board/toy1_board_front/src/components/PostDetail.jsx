import {
  Container,
  Content,
  PostMeta,
  Title,
  TitleContainer,
} from "components/styles/PostDetailStyles";

const PostDetail = ({ post }) => {
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  const currentId = localStorage.getItem("id");

  return (
    <Container>
      <TitleContainer>
        <Title>{post.title}</Title>
        <PostMeta>
          <span>{formattedDate}</span>
          <span>{post.author}</span>
          {currentId === post.Id}
        </PostMeta>
      </TitleContainer>
      <Content>{post.content}</Content>
    </Container>
  );
};

export default PostDetail;
