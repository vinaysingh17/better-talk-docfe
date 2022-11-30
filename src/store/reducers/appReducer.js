import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const appSlice = createSlice({
 name: 'app',
 initialState: {
     loaded: false,
     profileFocussed: false,
 },
 reducers: {
     setLoaded: (state,action) => {
         return {
             ...state,
             loaded: action.payload
         }
     },
     setProfileFocussed: (state,action) => {
        return {
            ...state,
            loaded: action.payload
        }
    },
 }
});

export const { setLoaded, setProfileFocussed } = appSlice.actions;
export default appSlice.reducer;