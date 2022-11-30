import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TurboModuleRegistry,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {AirbnbRating} from 'react-native-ratings';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dummydoc from '../../assets/dummydoc.png';
import nochatreq from '../../assets/nochatreq.png';
import moment from 'moment';
import {useCountdown} from '../../hooks/useCountdown';
import {useDispatch, useSelector} from 'react-redux';
import {setPatientRequested} from '../../store/reducers/joinReducer';
import {getUsersAsync} from '../../store/services/services';
import {
  setPatientSelected,
  setAppointmentId,
} from '../../store/reducers/chatReducer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const date1 = moment().add(5, 'minutes');
const date2 = moment().add(2, 'minutes');
const date3 = moment().add(1, 'minutes');
let now = moment();
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

const RequestsListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [users, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const docId = useSelector(state => state.doc.docId);
  console.log('docId: ', docId);
  const [zeroRequests, setZeroRequests] = useState(false);
  const appointmentReqs = useSelector(state => state.user.appointments);
  const scrollLength = appointmentReqs.length * 100 + 100;
  const appointmentsList = [
    {
      id: 1,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 2,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 3,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 4,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 5,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 6,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 7,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 8,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 9,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
    {
      id: 10,
      day: 'Tue',
      date: 23,
      time: '10.00 am - 11.00 am',
      user: 'Edward Costa',
      userDes: 'Student',
    },
  ];

  const statusList = ['Online', 'Offline'];

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUsersAsync({dispatch: dispatch, id: docId}));
    }, 10000);
    return () => clearInterval(interval);
  }, [docId]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getUsersAsync({dispatch: dispatch, id: docId}));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.subTitle}>Hope you are doing well today</Text>
        <Text style={styles.welcomeText}>Login Status</Text>
        <SelectDropdown
          data={statusList}
          onSelect={(selectedItem, index) => {}}
          defaultValueByIndex={0}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderCustomizedButtonChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                {index === 0 ? (
                  <View style={styles.greendotStatus}></View>
                ) : (
                  <View style={styles.reddotStatus}></View>
                )}
                <Text style={styles.dropdown1BtnTxtStyle}>{item}</Text>
              </View>
            );
          }}
          renderDropdownIcon={isOpened => {
            return (
              <MaterialCommunityIcons
                name={isOpened ? 'menu-up' : 'menu-down'}
                size={24}
                color="#7C98B6"
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                {index === 0 ? (
                  <View style={styles.greendot}></View>
                ) : (
                  <View style={styles.reddot}></View>
                )}
                <Text style={styles.dropdown1BtnTxtStyle}>{item}</Text>
              </View>
            );
          }}
        />
        <View style={styles.flexRow}>
          <Text style={styles.welcomeText}>Upcoming Appointments (2)</Text>
          <TouchableOpacity>
            <Text style={styles.highlightText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.appointContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>Tue</Text>
            <Text style={styles.date}>23</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Your Appointment</Text>
            <Text style={styles.subheading}>{appointmentsList[0].time}</Text>
            <Text style={styles.heading}>{appointmentsList[0].user}</Text>
            <Text style={styles.subheading}>{appointmentsList[0].userDes}</Text>
          </View>
          <View style={styles.arrContainer}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
              onPress={() => {
                navigation.navigate('Appointments');
              }}
            />
          </View>
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.welcomeText}>Chat Requests</Text>
        </View>
      </View>
      {zeroRequests ? (
        <View style={styles.nochat}>
          <Image source={nochatreq} style={styles.userImage} />
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 14,
              lineHeight: 24,
              marginTop: 5,
            }}>
            You have no chat requests as of now.
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.reqContainer}>
          <View style={{height: scrollLength}}>
            {appointmentReqs.map(user => {
              return (
                <TouchableOpacity
                  style={styles.docContainer}
                  key={user.id}
                  onPress={() => {
                    navigation.navigate('UserProfile', {userId: user.from});
                    dispatch(setPatientRequested(user.fromName));
                    dispatch(setPatientSelected(user.from));
                    dispatch(setAppointmentId(user._id));
                  }}>
                  <Image source={dummydoc} style={styles.doctorImage} />
                  <View style={styles.detailsContainer}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={styles.heading2}>{user.fromName}</Text>
                    </View>

                    <Text style={styles.subheading2}>Student</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={styles.greendot}></View>
                      <Text style={styles.subheading2}>
                        Join in &nbsp;
                        <Text style={styles.subheading3}>5:00 &nbsp;</Text>
                        mins
                      </Text>
                    </View>
                  </View>
                  <View style={styles.arrContainer2}>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={24}
                      color="#7C98B6"
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#FFFFFF',
    height: windowHeight,
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    width: windowWidth,
  },
  subTitle: {
    fontFamily: 'Inter-Normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
    marginBottom: 10,
  },
  appointContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#056AD0',
    borderRadius: 12,
    marginTop: 10,
  },
  nochat: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  reqContainer: {
    width: windowWidth,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    height: windowHeight,
  },
  docContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 4,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    position: 'relative',
    marginLeft: 2,
    marginRight: 8,
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    width: 51,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 10,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#33475B',
  },
  heading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  subheading: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  arrContainer: {
    marginLeft: 88,
    paddingVertical: 35,
  },
  doctorImage: {
    width: 64,
    height: 80,
    marginRight: 10,
  },
  arrContainer2: {
    paddingTop: 30,
    position: 'absolute',
    right: 20,
  },
  heading2: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },
  subheading2: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#5C6C7C',
  },
  subheading3: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#33475B',
  },
  subheading4: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#EB5757',
  },
  btnBook: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 28,
    color: '#056AD0',
  },
  greendot: {
    backgroundColor: '#00BDA5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 8,
  },
  reddot: {
    backgroundColor: '#D2042D',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 14,
  },
  greendotStatus: {
    backgroundColor: '#00BDA5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 14,
  },
  reddotStatus: {
    backgroundColor: '#D2042D',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 14,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCD6E0',
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {
    color: '#85919D',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown3RowStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
});

export default RequestsListScreen;
