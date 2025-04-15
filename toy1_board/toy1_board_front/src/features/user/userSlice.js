import { createSlice } from "@reduxjs/toolkit";

// 객체 초기화
const initialState = {
  id: null,
  nickname: null,
};

const userSlice = createSlice({
  // slice 이름
  name: "user",
  // 이 slice에서 관리할 상태들
  initialState,
  reducers: {
    // 상태변수 입력 로직
    setUser(state, action) {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
    },
    // 상태변수 삭제 로직
    clearUser(state) {
      state.id = null;
      state.nickname = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
