import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient/clientV1";

// Async thunk to fetch user info from /me
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("kata-app-token");

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const response = await httpClient.get("users/me");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.data = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload?.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.data;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUserRoleAdmin = (state) => state.user.data?.role === "admin";
