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
export const delUserRecord = createAsyncThunk(
  "create/removeRecord",
  async (id: number | string | undefined, thunkApi) => {
    try {
      const result = await axios.delete(`http://localhost:5000/users/${id}`);
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const searchUser = createAsyncThunk(
  "create/search",
  async (query: string, thunkApi) => {
    try {
      const result = await axios.get(`http://localhost:5000/users?q=${query}`);
      return result.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const sortUser = createAsyncThunk(
  "create/sort",
  async (query: string, thunkApi) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/users?_sort=${query}&_order=asc`
      );
      return result.data.sort((a: object, b: object) =>
        a > b ? a : b > a ? b : 0
      );
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
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(delUserRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(delUserRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.userRecord = action.payload;
    });
    builder.addCase(delUserRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(searchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userRecord = action.payload;
    });
    builder.addCase(searchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(sortUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sortUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userRecord = action.payload;
    });
    builder.addCase(sortUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default crudSlice.reducer;
