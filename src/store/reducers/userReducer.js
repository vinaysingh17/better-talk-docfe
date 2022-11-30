import {createSlice} from '@reduxjs/toolkit';

import {getUsersAsync} from '../services/services';

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    appointments: [],
    loading: false,
    error: false,
  },
  reducers: {
    setAppointments: (state, action) => {
      console.log('action: setAppointments', action);
      return {
        ...state,
        appointments: action.payload,
      };
    },
  },
  extraReducers: {
    [getUsersAsync.fulfilled]: (state, action) => {
      console.log('getUsersAsync action:payload ', action.payload);
      state.loading = false;
    },
    [getUsersAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log('getUsersAsync state.error: ', state.error);
      state.loading = false;
    },
    [getUsersAsync.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {setAppointments} = usersSlice.actions;
export default usersSlice.reducer;