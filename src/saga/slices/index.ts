import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import IPost from "../../appInterface/IPost";
import { clearStore } from "../actions";

const posts = createSlice({
  name: "posts",
  initialState: [] as IPost[],
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => payload,
  },
  extraReducers: {
    [clearStore.type]: () => [],
  },
});

export const { setPosts } = posts.actions;

export default posts.reducer;
