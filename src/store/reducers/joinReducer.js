import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const joinSlice = createSlice({
 name: 'join',
 initialState: {
     patientRequested: "",
 },
 reducers: {
     setPatientRequested: (state,action) => {
         return {
             ...state,
             loaded: action.payload
         }
     },
 }
});

export const { setPatientRequested } = joinSlice.actions;
export default joinSlice.reducer;