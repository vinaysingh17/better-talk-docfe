import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersAsync} from '../../store/services/services';
import {
  getDoctorIdAsync,
  getDoctorByIdAsync,
} from '../../store/services/docServices';
import SplashScreen from 'react-native-splash-screen';
import {setiIsLoggedIn} from '../../store/reducers/docReducer';

const windowHeight = Dimensions.get('window').height;

export default function SplashLoadScreen({navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.doc.loading);
  const docId = useSelector(state => state.doc.docId);
  useEffect(() => {
    dispatch(getDoctorIdAsync({dispatch: dispatch}));
    //dispatch(getUsersAsync({dispatch: dispatch}));
  }, []);

  useEffect(() => {
    if (loading) {
    } else {
      if (docId) {
        console.log(' dispatch(getDoctorByIdAsync userId: ', docId);
        dispatch(getDoctorByIdAsync({id: docId, dispatch: dispatch}));
        dispatch(setiIsLoggedIn(true));
        SplashScreen.hide();
      } else {
        navigation.navigate('Login');
        SplashScreen.hide();
      }
    }
  }, [loading, docId]);
  return null;
  // <View style={styles.rootContainer}>
  //   <Image source={splashlogo} style={styles.splashLogo} />
  // </View>
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
