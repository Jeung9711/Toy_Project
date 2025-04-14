import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:9000/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>로딩 중</div>;
  return (
    <div>
      <p>
        <strong>ID:</strong>
        {post.id}
      </p>
      <p>
        <strong>제목</strong>
        {post.title}
      </p>
      <p>
        <strong>내용</strong>
        {post.content}
      </p>
      <p>
        <strong>작성자</strong>
        {post.author}
      </p>
      <p>
        <strong>작성일</strong>
        {post.createdAt}
      </p>
    </div>
  );
};

export default PostDetail;
