import { useEffect, useState } from "react";
import { Column, PostContainer, PostRow } from "components/styles/PostList";
import { useNavigate } from "react-router-dom";

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
      {posts.map((data, index) => {
        return (
          <PostRow key={data.id} onClick={() => navigate(`/posts/${data.id}`)}>
            <Column>{index + 1}</Column>
            <Column>{data.id}</Column>
            <Column>{data.title}</Column>
            <Column>{data.author}</Column>
          </PostRow>
        );
      })}
    </PostContainer>
  );
};

export default PostList;
