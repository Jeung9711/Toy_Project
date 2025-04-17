import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "components/PostDetail";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:9000/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("글을 불러오는데 실패했습니다.", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return <PostDetail post={post} />;
};

export default PostDetailPage;
