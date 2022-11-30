import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setAbout,
  setAge,
  setDescription,
  setDocId,
  setExperience,
  setGender,
  setiIsLoggedIn,
  setLoading,
  setName,
  setPatients,
  setQualification,
} from '../reducers/docReducer';
const baseUrl = 'https://rihal-be.herokuapp.com/api/doctors';

const saveId = async id => {
  try {
    await AsyncStorage.setItem('docid', id);
    console.log('id:saveId', id);
  } catch (err) {
    console.log('saveId err', err);
  }
};

const saveLoggedIn = async () => {
  try {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
  } catch (err) {
    console.log('saveId err', err);
  }
};

export const getDoctorIdAsync = createAsyncThunk(
  'doctors/getDoctorIdAsync',
  ({dispatch}) => {
    return AsyncStorage.getItem('docid')
      .then(function (response) {
        //console.log('doctors/postDoctorsAsync response', response);
        console.log('doctors/getDoctorIdAsync response----------------------', response);
        dispatch(setDocId(response));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        console.log('doctors/getDoctorIdAsync error', error);
      });
  },
);

export const getDoctorByIdAsync = createAsyncThunk(
  'doctors/getDoctorByIdAsync',
  ({id, dispatch}) => {
    return axios
      .get(`https://rihal-be.herokuapp.com/api/doctors/${id}`)
      .then(function (response) {
        //console.log(' getDoctorByIdAsync response: ', response.data);
        //console.log(' getDoctorByIdAsync response: data', response.data.age);
        dispatch(setName(response.data.name));
        dispatch(setAge(response.data.age));
        dispatch(setQualification(response.data.qualification));
       // console.log(
        //  ' getDoctorByIdAsync response: data',
//response.data.qualification,
        //);
        dispatch(setPatients(response.data.patients));
        // console.log(
        //   ' getDoctorByIdAsync response: data',
        //   response.data.patients,
        // );
        dispatch(setExperience(response.data.experience));
        // console.log(
        //   ' getDoctorByIdAsync response: data',
        //   response.data.experience,
        // );
        dispatch(setDescription(response.data.description));
        // console.log(
        //   ' getDoctorByIdAsync response: data',
        //   response.data.description,
        // );
        dispatch(setAbout(response.data.about));
        // console.log(' getDoctorByIdAsync response: data', response.data.about);
        dispatch(setGender(response.data.gender));
        // console.log(' getDoctorByIdAsync response: data', response.data.gender);
        // dispatch(setQualification(response.data.qualification));
      })
      .catch(function (error) {
        console.log('getDoctorByIdAsync error: ', error);
      });
  },
);

export const postDoctorAsync = createAsyncThunk(
  'doctors/postDoctorsAsync',
  ({
    dispatch,
    name,
    qualification,
    about,
    age,
    gender,
    description,
    patients,
    experience,
    availability
  }) => {
    return axios
      .post('https://rihal-be.herokuapp.com/api/doctors', {
        name: name,
        qualification: qualification,
        sessions: 0,
        calls: 0,
        minutes: 0,
        about: about,
        availability: availability,
        experience: experience,
        patients: patients,
        description: description,
        gender: gender,
      })
      .then(function (response) {
        //console.log('doctors/postDoctorsAsync response', response);
        console.log('doctors/postDoctorsAsync response data', response.data);
        console.log(
          'doctors/postDoctorsAsync response data id--------------',
          response.data.data._id,
        );
        saveId(response.data.data._id);
        dispatch(setDocId(response.data.data._id));
        saveLoggedIn();
      })
      .catch(function (error) {
        console.log('doctors/postDoctorsAsync error', error);
      });
  },
);

export const updateSessionsAsync = createAsyncThunk(
  'doctors/updateSessionAsync',
  ({id, sessions}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/sessions/${id}`, {
        sessions: sessions,
      })
      .then(function (response) {
        console.log('doctors/postDoctorsAsync response', response);
      })
      .catch(function (error) {
        console.log('doctors/postDoctorsAsync error', error);
      });
  },
);

export const updateMinutesAsync = createAsyncThunk(
  'doctors/updateMinutesAsync',
  ({id, minutes}) => {
    console.log('minutes: updateMinutesAsync', minutes);
    console.log('id: updateMinutesAsync', id);
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/minutes/${id}`, {
        minutes: minutes,
      })
      .then(function (response) {
        console.log('doctors/updateMinutesAsync response', response);
      })
      .catch(function (error) {
        console.log('doctors/updateMinutesAsync error', error);
      });
  },
);

export const updateCallsAsync = createAsyncThunk(
  'doctors/updateCallsAsync',
  ({id, calls}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/calls/${id}`, {
        calls: calls,
      })
      .then(function (response) {
        console.log('doctors/updateCallsAsync response', response);
      })
      .catch(function (error) {
        console.log('doctors/updateCallsAsync error', error);
      });
  },
);

export const updatePatientsAsync = createAsyncThunk(
  'doctors/updatePatientsAsync',
  ({id, patients, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/patients/${id}`, {
        patients: patients,
      })
      .then(function (response) {
        console.log('doctors/updatePatientsAsync response', response);
        dispatch(setPatients(patients));
      })
      .catch(function (error) {
        console.log('doctors/updatePatientsAsync error', error);
      });
  },
);

export const updateDescriptionAsync = createAsyncThunk(
  'doctors/updateDescriptionAsync',
  ({id, description, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/description/${id}`, {
        description: description,
      })
      .then(function (response) {
        console.log('doctors/updateDescriptionAsync response', response);
        dispatch(setDescription(description));
      })
      .catch(function (error) {
        console.log('doctors/updateDescriptionAsync error', error);
      });
  },
);

export const updateAboutAsync = createAsyncThunk(
  'doctors/updateAboutAsync',
  ({id, about, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/about/${id}`, {
        about: about,
      })
      .then(function (response) {
        console.log('doctors/updateAboutAsync response', response);
        dispatch(setAbout(about));
      })
      .catch(function (error) {
        console.log('doctors/updateAboutAsync error', error);
      });
  },
);

export const updateQualificationAsync = createAsyncThunk(
  'doctors/updateQualificationAsync',
  ({id, qualification, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/qualification/${id}`, {
        qualification: qualification,
      })
      .then(function (response) {
        console.log('doctors/updateQualificationAsync response', response);
        dispatch(setQualification(qualification));
      })
      .catch(function (error) {
        console.log('doctors/updateQualificationAsync error', error);
      });
  },
);

export const updateExperienceAsync = createAsyncThunk(
  'doctors/updateExperienceAsync',
  ({id, experience, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/experience/${id}`, {
        experience: experience,
      })
      .then(function (response) {
        console.log('doctors/updateExperienceAsync response', response);
        dispatch(setExperience(experience));
      })
      .catch(function (error) {
        console.log('doctors/updateExperienceAsync error', error);
      });
  },
);

export const updateAgeAsync = createAsyncThunk(
  'doctors/updateAgeAsync',
  ({id, age, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/age/${id}`, {
        age: age,
      })
      .then(function (response) {
        console.log('doctors/updateAgeAsync response', response);
        dispatch(setAge(age));
      })
      .catch(function (error) {
        console.log('doctors/updateAgeAsync error', error);
      });
  },
);

export const updateGenderAsync = createAsyncThunk(
  'doctors/updateGenderAsync',
  ({id, gender, dispatch}) => {
    return axios
      .put(`https://rihal-be.herokuapp.com/api/doctors/gender/${id}`, {
        gender: gender,
      })
      .then(function (response) {
        console.log('doctors/updateGenderAsync response', response);
        dispatch(setGender(gender));
      })
      .catch(function (error) {
        console.log('doctors/updateGenderAsync error', error);
      });
  },
);

export const deleteAppointmentAsync = createAsyncThunk(
  'appointments/deleteAppointmentAsync',
  ({from, to}) => {
    return axios
      .delete("https://rihal-be.herokuapp.com/api/appointments", {
        from: from,
        to: to
      })
      .then(function (response) {
        console.log('appointments/deleteAppointmentAsync response', response);
      })
      .catch(function (error) {
        console.log('appointments/deleteAppointmentAsync error', error);
      });
  },
);
