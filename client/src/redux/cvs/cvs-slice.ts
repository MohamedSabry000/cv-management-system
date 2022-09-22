import { BASE_URL } from '../../utils/getDataFromAPI'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../@types/types';

import cvsService from './cvs-services';

export const login = createAsyncThunk(
  'cvs/login',
  async (user: { email: string, password: string }) => {
    return await cvsService.login(user.email, user.password);
  }
);

export const register = createAsyncThunk(
  'cvs/register',
  async (user: {name: string, email: string, password: string }) => {
    return await cvsService.register(user.name, user.email, user.password);
  }
);

export const forgotPassword = createAsyncThunk(
  'cvs/forgotPassword',
  async (email: string) => {
    return await cvsService.forgotPassword(email);
  }
);

export const resetPassword = createAsyncThunk(
  'cvs/resetPassword',
  async (user: { id: string, token: string, password: string }) => {
    return await cvsService.resetPassword(user.id, user.token, user.password);
  }
);


const initialState = {
  user: null as User | null,
  isLoading: false as boolean,
  isSuccess: false as boolean,
  isError: false as boolean,
};

const cvsSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    reset(state) {
      Array.from(Object.entries(initialState)).forEach(([key, value]) => {
        state = {...state, [key]: value};
      });
    },
    setLogout(state) {
      localStorage.removeItem('token');
      Array.from(Object.entries(initialState)).forEach(([key, value]) => {
        state = {...state, [key]: value};
      });
      console.log(state);
    },
  },
  extraReducers: {
    // Users
    // Login
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      if(action.payload.data.status === "success") {
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data.token;
        localStorage.setItem('token', action.payload.data.token);
      } else {
        state.isError = true;
        state.isSuccess = false;
      }
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      console.log(action.error);
    },
    // Register
    [register.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
      // state.user = action.payload;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Forgot Password
    [forgotPassword.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [forgotPassword.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Reset Password
    [resetPassword.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [resetPassword.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { reset, setLogout } = cvsSlice.actions;
export default cvsSlice.reducer;
