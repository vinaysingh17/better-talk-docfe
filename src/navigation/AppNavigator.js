import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {View, Text, StatusBar, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import RequestsListScreen from '../screens/joinsession/RequestsListScreen';
import AppointmentsScreen from '../screens/joinsession/AppointmentsScreen';
import UserProfileScreen from '../screens/joinsession/UserProfileScreen';
import OnboardingNameScreen from '../screens/onboarding/OnboardingNameScreen';
import OnboardingDescribeScreen from '../screens/onboarding/OnboardingDescribeScreen';
import OnboardingExpScreen from '../screens/onboarding/OnboardingExpScreen';
import OnboardingAboutScreen from '../screens/onboarding/OnboardingAboutScreen';
import AppointmentWaitingScreen from '../screens/chat/AppointmentWaitingScreen';
import PostsListScreen from '../screens/forums/PostsListScreen';
import AddPostScreen from '../screens/forums/AddPostScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import VoiceCallScreen from '../screens/chat/VoiceCallScreen';
import VideoCallScreen from '../screens/chat/VideoCallScreen';
import LoginScreen from '../screens/login/LoginScreen';
import LoginNumScreen from '../screens/signup/LoginNumScreen';
import SignupScreen from '../screens/signup/SignupScreen';
import LoginOtpScreen from '../screens/signup/LoginOtpScreen';
import SignupOtpScreen from '../screens/signup/SignupOtpScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import GenDetailsScreen from '../screens/settings/GenDetailsScreen';
import ProfDetailsScreen from '../screens/settings/ProfDetailsScreen';
import AboutYourselfScreen from '../screens/settings/AboutYourselfScreen';
import SplashLoadScreen from '../screens/signup/SplashLoadScreen';
import BackButton from '../components/BackButton';
import HelpButton from '../components/HelpButton';
import {Button, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useCountdown} from '../hooks/useCountdown';
import {useStopwatch} from 'react-timer-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  updateMinutesAsync,
  updateSessionsAsync,
  updateCallsAsync,
} from '../store/services/docServices';
import TimerHeader from '../components/TimerHeader';
import {setCurrMins} from '../store/reducers/docReducer';
import {setMode} from '../store/reducers/chatReducer';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function StopWatch() {
  const [firstLoad, setFirstLoad] = useState(null);
  const {seconds, minutes, hours, days, isRunning, start, pause, reset} =
    useStopwatch({autoStart: true});
  const [workMins, setWorkmins] = useState(0);
  const docId = useSelector(state => state.doc.docId);
  //console.log('docId: in stopwatch ', docId);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('stopwatch start');
    const temp = new Date();
    setFirstLoad(temp);
  }, []);

  useEffect(() => {
    console.log('current stopwatch minutes', minutes);
    setWorkmins(minutes);
    dispatch(setCurrMins(minutes));
  }, [minutes]);

  return (
    <Text
      style={{
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        lineHeight: 12,
        color: '#85919D',
      }}>
      Running Time-
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          lineHeight: 24,
          color: '#33475B',
        }}>
        {minutes}:{String(seconds).padStart(2, '0')}
      </Text>
    </Text>
  );
}

const HeaderTitleChat = () => {
  const sessionType = useSelector(state => state.chat.sessionType);
  const sessionEnd = useSelector(state => state.chat.sessionEnd);
  const docId = useSelector(state => state.doc.docId);
  const [days, hours, minutes, seconds] = useCountdown(sessionEnd);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 18,
          lineHeight: 26,
          color: '#33475B',
        }}>
        Edward Murphy
      </Text>
      {sessionType === 'permins' ? <StopWatch /> : <TimerHeader />}
    </View>
  );
};

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <Icon
      name="reorder-three"
      size={24}
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  );
};

function HomeNavigator({navigation}) {
  const name = useSelector(state => state.doc.name);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RequestsList"
        component={RequestsListScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello{' '}
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  Dr. {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <Icon name="notifications" size={24} />
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function ForumsNavigator() {
  const name = useSelector(state => state.doc.name);
  const qty = useSelector(state => state.notification.quantity);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsList"
        component={PostsListScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <View style={{position: 'relative'}}>
                <Icon
                  name="notifications"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}
                />
                <Badge
                  visible={qty !== 0}
                  style={{
                    position: 'absolute',
                    top: -7,
                    left: 10,
                    backgroundColor: '#00BDA5',
                  }}>
                  {qty}
                </Badge>
              </View>
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LoginNavigator() {
  const name = useSelector(state => state.doc.name);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginHours"
        component={LoginScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Hello{' '}
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    lineHeight: 26,
                    color: '#056AD0',
                  }}>
                  Dr. {name}
                </Text>
                !
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <Icon name="notifications" size={24} />
              <Icon name="chatbox-ellipses-outline" size={24} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="MyHome"
      unmountInactiveScreens={true}
      screenOptions={{
        tabBarActiveTintColor: '#056AD0',
        tabBarInactiveTintColor: '#28323E',
        activeTintColor: '#056AD0',
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        },
      }}>
      <Tabs.Screen
        name="MyHome"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={HomeNavigator}
      />
      <Tabs.Screen
        name="Login"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="power"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={LoginNavigator}
      />
      <Tabs.Screen
        name="Forums"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="groups"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={ForumsNavigator}
        // component={ChatScreen}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={focused ? '#056AD0' : '#28323E'}
            />
          ),
        }}
        component={SettingsNavigator}
      />
    </Tabs.Navigator>
  );
}

function MainApp({navigation}) {
  const patient = useSelector(state => state.join.patientRequested);
  const currMins = useSelector(state => state.doc.currMins);
  const sessionType = useSelector(state => state.chat.sessionType);
  const dispatch = useDispatch();
  const docId = useSelector(state => state.doc.docId);
  const minEndHandler = () => {
    dispatch(updateMinutesAsync({id: docId, minutes: currMins}));
    dispatch(updateCallsAsync({id: docId, calls: 1}));
  };

  const sessEndHandler = () => {
    dispatch(updateCallsAsync({id: docId, calls: 1}));
    dispatch(updateSessionsAsync({id: docId, sessions: 1}));
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Upcoming Appointments(2)
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppointmentWaiting"
        component={AppointmentWaitingScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Edward Costa
              </Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 70,
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {}}
              />
              <Icon name="call" size={24} color="#056AD0" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatPatient"
        component={ChatScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => <HeaderTitleChat />,
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 30,
                width: 110,
                justifyContent: 'space-between',
              }}>
              <MaterialIcons
                name="call-end"
                size={24}
                color={'#990b19'}
                onPress={() => {
                  sessionType === 'permins'
                    ? minEndHandler()
                    : sessEndHandler();
                  Alert.alert('Session Ended', 'Your session has ended', [
                    {
                      text: 'Go To Patient Requests',
                      onPress: () => {
                        navigation.navigate('RequestsList');
                      },
                    },
                  ]);
                }}
              />
              <MaterialCommunityIcons
                name="video"
                size={24}
                color="#056AD0"
                onPress={() => {
                  dispatch(setMode('video'));
                  //navigation.navigate('VideoCall');
                }}
              />
              <Icon
                name="call"
                size={24}
                color="#056AD0"
                onPress={() => {
                  dispatch(setMode('audio'));
                  //navigation.navigate('VoiceCall');
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GenDetails"
        component={GenDetailsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                General Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ProfDetails"
        component={ProfDetailsScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Professional Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AboutYourself"
        component={AboutYourselfScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                Medical Details
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="VoiceCall"
        component={VoiceCallScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  lineHeight: 26,
                  color: '#33475B',
                }}>
                New Post
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const isLoggedIn = useSelector(state => state.doc.isLoggedIn);
  const profileFocussed = useSelector(state => state.app.profileFocussed);
  return (
    <NavigationContainer>
      {profileFocussed ? null : (
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      )}
      <Stack.Navigator
        screenOptions={{
          cardShadowEnabled: false,
          cardOverlayEnabled: false,
          animationEnabled: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={SplashLoadScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginNumScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoginOtp"
              component={LoginOtpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignupOtp"
              component={SignupOtpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnboardingName"
              component={OnboardingNameScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
            <Stack.Screen
              name="OnboardingAbout"
              component={OnboardingAboutScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />

            <Stack.Screen
              name="OnboardingExp"
              component={OnboardingExpScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
            <Stack.Screen
              name="OnboardingDescribe"
              component={OnboardingDescribeScreen}
              options={{
                headerLeft: () => <BackButton />,
                headerTitle: 'Better Talk',
                headerRight: () => <HelpButton />,
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
