import {createSlice} from '@reduxjs/toolkit';
import React from 'react';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    sessionEnd: '',
    sessionType: 'permins',
    patientSelected: "",
    appointmentId: "",
    mode: "chat",
  },
  reducers: {
    setSessionEnd: (state, action) => {
      return {
        ...state,
        sessionEnd: action.payload,
      };
    },
    setSessionType: (state, action) => {
      return {
        ...state,
        sessionType: action.payload,
      };
    },
    setPatientSelected: (state, action) => {
      return {
        ...state,
        patientSelected: action.payload,
      };
    },
    setAppointmentId: (state, action) => {
      console.log('setAppointmentId action: ', action.payload);
      return {
        ...state,
        appointmentId: action.payload,
      };
    },
    setMode: (state, action) => {
      console.log('setMode action: ', action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    },
  },
});

export const {setSessionEnd, setSessionType,setPatientSelected,setAppointmentId,setMode} = chatSlice.actions;
export default chatSlice.reducer;
