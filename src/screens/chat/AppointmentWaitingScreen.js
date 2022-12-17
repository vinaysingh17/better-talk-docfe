import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import appointmentwaiting from '../../assets/appointmentwaiting.png';
import {Button} from 'react-native-paper';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';
import {socketbase, STRIX_URL} from '../../store/services/docServices';

const windowHeight = Dimensions.get('window').height;

const AppointmentWaitingScreen = ({navigation}) => {
  const [isAccecpted, setIsAccepted] = useState(false);
  const docId = useSelector(state => state.doc.docId);
  const appointmentId = useSelector(state => state.chat.appointmentId);

  // const socket = io('https://socketrahilbe.herokuapp.com/', {
  const socket = io(socketbase, {
    query: {appointmentId: appointmentId, docId: docId},
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {});
    socket.on('connect_error', e => {});
  }, []);

  useEffect(() => {
    socket.on('start', ({message, from, to, fromDoc}) => {
      console.log('start');
      setIsAccepted(true);
    });
  }, [socket]);
  socket.on('start', ({message, from, to, fromDoc}) => {
    console.log('start');
    setIsAccepted(true);
  });

  useEffect(() => {
    if (isAccecpted) {
      navigation.navigate('ChatPatient');
    }
  }, [isAccecpted]);

  return (
    <View style={styles.rootContainer}>
      <Image source={appointmentwaiting} style={styles.appointmentImage} />
      <Text style={styles.arrived}>
        Waiting for the patient to start the appointment.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 55,
  },
  appointmentImage: {},
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    width: '80%',
    marginTop: 20,
  },
  arrived: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
    textAlign: 'center',
  },
});

export default AppointmentWaitingScreen;
