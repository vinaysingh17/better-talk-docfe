import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { setAppointments } from '../reducers/userReducer';

const baseUrl = 'https://rihal-be.herokuapp.com/api';

export const getUsersAsync = createAsyncThunk(
  'users/getUsersAsync',
  ({dispatch,id}) => {
    return axios
      .get(`https://rihal-be.herokuapp.com/api/appointments/requests/${id}`)
      .then(function (response) {
        console.log('response: getUsersAsync data', response.data);
        console.log('response: getUsersAsync message', response.message);
        console.log('response: getUsersAsync', response);
        dispatch(setAppointments(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log('getUsersAsync error: ', error);
      });
  },
);


