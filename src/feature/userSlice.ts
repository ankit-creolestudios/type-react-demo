import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../appInterface/UserInterface";
interface initialStateProps {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: initialStateProps = {
  users: [],
  loading: false,
  error: null,
};
export const loadUser = createAsyncThunk<User[]>(
  "user/load",
  async (_, thunkApi) => {
    try {
      const result = axios.get(`https://jsonplaceholder.typicode.com/users`);
      return (await result).data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default userSlice.reducer;
