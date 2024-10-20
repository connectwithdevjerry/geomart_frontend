import { jwtDecode } from "jwt-decode";
import customFetch from "./axiosObject";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  userMessage: "",
  loading: false,
  accessToken: "",
  isAuth: false,
  currentPath: "",
  myProfile: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserMsg: (state) => {
      state.userMessage = "";
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    // setMyProfile: (state, action) => {
    //   state.myProfile = action.payload;
    //   state.isAuth = true;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        console.log("creating user...");
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log({ action });
        console.log("user created...");
        if (!action.payload.status) {
          state.userMessage = action.payload.message;
        } else {
          state.userMessage = "";

          const { accessToken, refreshToken } = action.payload;
          state.accessToken = accessToken;
          state.myProfile = jwtDecode(accessToken);
          state.isAuth = true;

          console.log({ fromjwt: jwtDecode(accessToken) });
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        console.log("user could not be created...");
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        console.log("authenticating user...");
        state.userMessage = "";
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (!action.payload.status) {
          state.isAuth = false; //
          state.userMessage = action.payload.message;
          return;
        }

        state.isAuth = true;

        const { accessToken, refreshToken } = action.payload;

        state.accessToken = accessToken;

        state.myProfile = jwtDecode(accessToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // window.location.href = state.currentPath || "/";
      })
      .addCase(getUser.rejected, (state) => {
        console.log("could not fetch user...");
        state.userMessage = "Error occured while getting user!";
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        console.log("sending request to reset password...");
        state.loading = true;
        state.userMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.status) {
          if (action.payload.message === "jwt expired") {
            state.userMessage = "You're using an expired Link";
          } else {
            state.userMessage = action.payload.message;
          }
          state.userMessage = "Password Reset Successful!";
          return;
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        console.log("could not fetch user...");
        state.loading = false;
        state.userMessage = "could not fetch user...";
      });
  },
});

export const getUser = createAsyncThunk("crud/getUser", async (credentials) => {
  try {
    const response = await customFetch.post("user/get_user", credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const navigate = (url) => {
  window.location.href = url;
};

export const handleGoogleAuth = createAsyncThunk(
  "crud/googleAuth",
  async () => {
    await axios
      .post("http://localhost:5000/user/google/request")
      .then((res) => {
        console.log({ googleRes: res });
        navigate(res.data.url);
      });
  }
);

export const createUser = createAsyncThunk(
  "crud/createUser",
  async (credentials) => {
    try {
      const response = await customFetch.post("user/create_user/", credentials);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "crud/resetPassword",
  async (values) => {
    try {
      const response = await customFetch.post("user/resetpassword", values);
      console.log({ values, res: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const { clearUserMsg, setCurrentPath, setMyProfile } = userSlice.actions;

export default userSlice.reducer;
