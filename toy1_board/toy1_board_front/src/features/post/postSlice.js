import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // 포스트 출력 준비
    setPosts(state, action) {
      state.posts = action.payload;
    },
    // 포스트 추가
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    // 포스트 수정
    updatePost(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    // 포스트 삭제
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setPosts, addPosts, updatePosts, deletePost } =
  postSlice.actions;
export const postReducer = postSlice.reducer;
