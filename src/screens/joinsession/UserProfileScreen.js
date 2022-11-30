import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {setProfileFocussed} from '../../store/reducers/appReducer';
import { setPatientRequested } from '../../store/reducers/joinReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dummyuser from '../../assets/dummyuser.png';
import moment from 'moment';
import {useCountdown} from '../../hooks/useCountdown';
import io from 'socket.io-client';


const windowHeight = Dimensions.get('window').height + 30;
const windowWidth = Dimensions.get('window').width;
const date1 = moment().add(5, 'minutes');
const date2 = moment().add(2, 'minutes');
const date3 = moment().add(1, 'minutes');
const requestsList = [
  {
    id: 1,
    name: 'Edward Costa',
    designation: 'Student',
    join: date1,
  },
  {
    id: 2,
    name: 'Edward Costa',
    designation: 'Student',
    join: date2,
  },
  {
    id: 3,
    name: 'Edward Costa',
    designation: 'Student',
    join: date3,
  },
  {
    id: 4,
    name: 'Edward Costa',
    designation: 'Student',
    join: date3,
  },
  {
    id: 5,
    name: 'Edward Costa',
    designation: 'Student',
    join: date3,
  },
];

export default function UserProfileScreen({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {userId} = route.params;
  let item = requestsList.find(x => x.id === userId);
  let now = moment();
  let date = moment().add(5,'minutes');
  let formatted = date.format('Do hh:mm A');
  const [days, hours, minutes, seconds] = useCountdown(date);
  let fromNow = date.diff(now, 'minutes', true).toFixed(2);
  const [userIdTemp, setUserIdTemp] = useState(123);
  const docId = useSelector(state=>state.doc.docId);
  const patientSelected = useSelector(state=>state.chat.patientSelected);
  const appointmentId = useSelector(state => state.chat.appointmentId);
  //console.log('patientSelected: ', patientSelected);
  const socket = io('https://socketrahilbe.herokuapp.com/', {
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

  function acceptAppointmentHandler() {
    navigation.navigate('AppointmentWaiting');
    socket.emit('accept', {
      status: true,
      from: docId,
      to: patientSelected,
      id: 123,
    });
  }

  useEffect(() => {
    dispatch(setProfileFocussed(isFocused));
    return () => {
      dispatch(setProfileFocussed(false));
    };
  }, []);

  function timer(date, now) {
    return date.diff(now, 'minutes', true).toFixed(2);
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          height: windowHeight,
        },
      ]}>
      <LinearGradient
        colors={['#E6F2FF', '#AED6FF', '#2D8AE9']}
        style={styles.linearGradient}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#28323E"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-start', marginTop: 45, marginLeft: 20}}
        />
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>Mr. Edward Costa</Text>
            <Text style={styles.qualification}>Student</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={styles.greendot} />
              {fromNow <= 10 ? (
                <Text style={styles.join}>
                  Join in{' '}
                  <Text style={styles.emphasis2}>
                    {minutes}:{String(seconds).padStart(2, '0')}
                  </Text>
                  &nbsp;mins
                </Text>
              ) : (
                <Text style={styles.join}>
                  Join on <Text style={styles.emphasis3}>{formatted}</Text>
                  &nbsp;
                </Text>
              )}
            </View>
          </View>
          <Image source={dummyuser} style={styles.userImage} />
        </View>
        <View style={styles.medicalContainer}>
          <Text style={styles.subheading}>About</Text>
          <Text style={styles.details}>
            Age - <Text style={styles.emphasis}>25 Years</Text>
          </Text>
          <Text style={styles.details}>
            Gender - <Text style={styles.emphasis}>Male</Text>
          </Text>
          <Text style={styles.details}>
            Location - <Text style={styles.emphasis}>Hyderabad</Text>
          </Text>
          <Text style={styles.details}>
            Profession - <Text style={styles.emphasis}>Student</Text>
          </Text>
          <Text style={styles.subheading}>Medical History</Text>
          <Text style={styles.body}>
            Folks who fell off roofs trying to chisel ice dams are still hopping
            around on crutches. High school kids are taking groumderson
            gymnasium floors and some desperate homeowners
          </Text>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => {
           acceptAppointmentHandler();
          }}
          disabled={fromNow >= 10}
          style={styles.btnOnboard}>
          {fromNow >= 10 ? (
            <Text style={styles.btnText}>Join at scheduled time</Text>
          ) : (
            <Text style={styles.btnText}>Join Now</Text>
          )}
        </Button>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  linearGradient: {
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  btnOnboard: {
    position: 'absolute',
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    bottom: 20,
    width: '90%',
    left: 20,
  },
  userContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
  },
  detailsContainer: {
    width: 183,
    height: 100,
    padding: 5,
  },
  medicalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FDFDFD',
    elevation: 2,
    width: windowWidth,
    padding: 20,
    height: 500,
    position: "absolute",
    bottom: 0,
  },
  userImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E9F0',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    lineHeight: 26,
  },
  qualification: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
    marginTop: 10,
    color: '#33475B',
  },
  body: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
    marginTop: 10,
  },
  emphasis: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 28,
    color: '#33475B',
  },
  emphasis2: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    color: '#EB5757',
  },
  emphasis3: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    color: '#33475B',
    marginTop: 5,
  },
  join: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 12,
  },
  greendot: {
    backgroundColor: '#00BDA5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    marginRight: 8,
  },
});
