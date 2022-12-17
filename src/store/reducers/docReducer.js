import {createSlice} from '@reduxjs/toolkit';
import React from 'react';
import {
  postDoctorAsync,
  updateCallsAsync,
  updateMinutesAsync,
  updateSessionsAsync,
  getDoctorIdAsync,
} from '../services/docServices';

export const docSlice = createSlice({
  name: 'doc',
  initialState: {
    name: '',
    qualification: '',
    isLoggedIn: false,
    loading: true,
    docId: '',
    currMins: 0,
    about: '',
    description: '',
    patients: '',
    experience: '',
    age: '',
    gender: '',
    image: '',
  },
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setQualification: (state, action) => {
      return {
        ...state,
        qualification: action.payload,
      };
    },
    setImage: (state, action) => {
      console.log('action: set image', action);
      return {
        ...state,
        image: action.payload,
      };
    },
    setiIsLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setDocId: (state, action) => {
      console.log('action:setDocId ', action.payload);
      return {
        ...state,
        docId: action.payload,
      };
    },
    setCurrMins: (state, action) => {
      console.log('action:setCurrMins ', action.payload);
      return {
        ...state,
        currMins: action.payload,
      };
    },
    setAbout: (state, action) => {
      console.log('action:setAbout ', action.payload);
      return {
        ...state,
        about: action.payload,
      };
    },
    setPatients: (state, action) => {
      console.log('action:setPatients ', action.payload);
      return {
        ...state,
        patients: action.payload,
      };
    },
    setDescription: (state, action) => {
      console.log('action:setDescription ', action.payload);
      return {
        ...state,
        description: action.payload,
      };
    },
    setExperience: (state, action) => {
      console.log('action:setExperience ', action.payload);
      return {
        ...state,
        experience: action.payload,
      };
    },
    setAge: (state, action) => {
      console.log('action:setAge ', action.payload);
      return {
        ...state,
        age: action.payload,
      };
    },
    setGender: (state, action) => {
      console.log('action:setGender ', action.payload);
      return {
        ...state,
        gender: action.payload,
      };
    },
  },
  extraReducers: {
    [postDoctorAsync.fulfilled]: (state, action) => {
      console.log('action:payload ', action.payload);
    },
    [postDoctorAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
    [updateSessionsAsync.fulfilled]: (state, action) => {
      console.log('action:payload ', action.payload);
    },
    [updateSessionsAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
    [updateMinutesAsync.fulfilled]: (state, action) => {
      console.log('action:payload ', action.payload);
    },
    [updateMinutesAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
    [updateCallsAsync.fulfilled]: (state, action) => {
      console.log('action:payload ', action.payload);
    },
    [updateCallsAsync.rejected]: (state, action) => {
      console.log('action.error.message: ', action.error.message);
    },
    [getDoctorIdAsync.fulfilled]: (state, action) => {
      console.log('action:payload getDoctorIdAsync', action.payload);
    },
    [getDoctorIdAsync.pending]: (state, action) => {
      console.log('action:payload getDoctorIdAsync', action.payload);
    },
    [getDoctorIdAsync.rejected]: (state, action) => {
      console.log(
        'action.error.message: getDoctorIdAsync',
        action.error.message,
      );
    },
  },
});

export const {
  setName,
  setQualification,
  setiIsLoggedIn,
  setDocId,
  setCurrMins,
  setAbout,
  setDescription,
  setExperience,
  setPatients,
  setImage,
  setAge,
  setGender,
  setLoading,
} = docSlice.actions;
export default docSlice.reducer;
