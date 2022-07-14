import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserReords } from "../appInterface/CrudInterface";
interface initialStateProps {
  userRecord: UserReords[];
  user: UserReords | Object;
  loading: boolean;
  error: any;
}

const initialState: initialStateProps = {
  userRecord: [],
  user: {},
  loading: false,
  error: null,
};

export const createUserRecord = createAsyncThunk<Object, UserReords>(
  "record/create",
  async (formVal, thunkApi) => {
    console.log(formVal);
    try {
      const result = await axios.post("http://localhost:5000/users", formVal);
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const retrieveUser = createAsyncThunk(
  "record/retrieve",
  async (_, thunkApi) => {
    try {
      const result = await axios.get("http://localhost:5000/users");
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const updateUser = createAsyncThunk<Object, UserReords>(
  "record/updateUser",
  async (formVal, thunkApi) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/users/${formVal.id}`,
        formVal
      );
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
const crudSlice = createSlice({
  name: "crud",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(createUserRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(retrieveUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(retrieveUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userRecord = action.payload;
    });
    builder.addCase(retrieveUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default crudSlice.reducer;
