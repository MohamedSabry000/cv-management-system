import { BASE_URL } from '../../utils/getDataFromAPI'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, CV, Section } from '../../@types/types';

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

// TODO: add createCV thunk
export const createCV = createAsyncThunk(
  'cvs/createCV',
  async (cv: { name: string, email: string }) => {
    return await cvsService.createCV(cv.name, cv.email);
  }
);

export const getCvs = createAsyncThunk(
  'cvs/getCvs',
  async () => {
    return await cvsService.getCvs();
  }
);

export const deleteCV = createAsyncThunk(
  'cvs/deleteCV',
  async (id: string) => {
    return await cvsService.deleteCV(id);
  }
);

export const updateCV = createAsyncThunk(
  'cvs/updateCV',
  async (cv: CV) => {
    return await cvsService.updateCV(cv);
  }
);

// TODO: add createSection thunk
export const createSection = createAsyncThunk(
  'cvs/createSection',
  async (section: { title: string, cvId: string }) => {
    return await cvsService.createSection(section.title, section.cvId);
  }
);

export const getSections = createAsyncThunk(
  'cvs/getSections',
  async (cvId: string) => {
    return await cvsService.getSections(cvId);
  }
);


const initialState = {
  user: null as User | null,
  cvs: [] as CV[],
  sections: [] as Section[],
  isLoading: false as boolean,
  isSuccess: false as boolean,
  isError: false as boolean,
};

const cvsSlice = createSlice({
  name: 'cvs',
  initialState,
  reducers: {
    reset(state) {
      Array.from(Object.entries(initialState)).forEach(([key, value]) => {
        state = {...state, [key]: value};
      });
    },
    setLogout(state) {
      state.user = null;
      state.cvs = [];
      state.sections = [];
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
        const { name, token, email } = action.payload.data;
        state.isSuccess = true;
        state.isError = false;
        state.user = {name, email, token};
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
    // Create CV
    [createCV.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [createCV.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        state.cvs.push(action.payload.data.cv);
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [createCV.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Get CVs
    [getCvs.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getCvs.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        state.cvs = action.payload.data.cvs;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [getCvs.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Update CV
    [updateCV.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [updateCV.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        const index = state.cvs.findIndex(cv => cv._id === action.payload.data.cv._id);
        console.log(action.payload.data.cv);
        state.cvs[index] = action.payload.data.cv;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [updateCV.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Delete CV
    [deleteCV.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCV.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        const index = state.cvs.findIndex(cv => cv._id === action.payload.data.cv._id);
        state.cvs.splice(index, 1);
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    // Create Section
    [createSection.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [createSection.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        state.sections.push(action.payload.data.section);
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [createSection.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // Get Sections
    [getSections.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getSections.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      if(action.payload.data.status === 'success') {
        state.isSuccess = true;
        state.isError = false;
        state.sections = action.payload.data.sections;
      } else {
        state.isSuccess = false;
        state.isError = true;
      }
    },
    [getSections.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { reset, setLogout } = cvsSlice.actions;
export default cvsSlice.reducer;
