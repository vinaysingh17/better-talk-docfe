import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setAppointments} from '../reducers/userReducer';
import {STRIX_URL} from './docServices';

const baseUrl = 'https://rihal-be.herokuapp.com/api';

export const getUsersAsync = createAsyncThunk(
  'users/getUsersAsync',
  ({dispatch, id}) => {
    return axios
      .get(STRIX_URL + `/api/appointments/requests/${id}`)
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

export const checkLocalAPI = () => {
  console.log('calling localapi');
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  // fetch('http://192.168.10.3:3002', requestOptions)
  fetch('http://localhost:3002', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result, '<<<<localapi'))
    .catch(error => console.log('error localapi', error));
};

export const updateImage = (userid, file, CallBack) => {
  console.log('\n\ncalling api to get image update\n\n', file, userid);
  var formdata = new FormData();
  formdata.append('Image', file, file.name);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(STRIX_URL + '/api/doctors/profile/' + userid, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('<<<< PAI update image \n\n\n\n');
      CallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const UpdateAvailability = (status, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    status: status,
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    STRIX_URL + '/api/doctors/available/62da4da35ddf895ccf3b27be',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
