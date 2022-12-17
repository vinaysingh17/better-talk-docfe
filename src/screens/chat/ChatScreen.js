import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import ChatBox from '../../components/ChatBox';
import {Header} from '@react-navigation/stack';
import {useImmer} from 'use-immer';
import {Modal, Portal, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {setSessionEnd} from '../../store/reducers/chatReducer';
import useChat from '../../hooks/useChatRoom';
import VideoCallScreen from './VideoCallScreen';
import VoiceCallScreen from './VoiceCallScreen';

const windowHeight = Dimensions.get('window').height - 60;
const windowWidth = Dimensions.get('window').width;

const ChatScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.chat.mode);
  const [pvtMsg, setPvtMsg] = useState(null);
  const {
    messages,
    typing,
    whoTyping,
    Link,
    sendMessage,
    sendTyping,
    JoinOnMeet,
  } = useChat();
  const [userId, setUserId] = useState(123);
  const now = moment();
  const sessionEnd = moment().add(60, 'minutes');

  useEffect(() => {
    dispatch(setSessionEnd(sessionEnd));
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [navigation]);

  const sendMsgHandler = () => {
    if (pvtMsg !== '') {
      sendMessage(pvtMsg);
      setPvtMsg('');
    }
    sendTyping(false);
  };
  const joinMeet = link => {
    console.log(link, '<<<Thisislink');
    if (link !== '') {
      JoinOnMeet(link);
      // setPvtMsg('');
    }
    sendTyping(false);
  };

  const changeTxtHandler = text => {
    setPvtMsg(text);
    let temp = text.length > 0 ? true : false;
    sendTyping(temp);
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.rootContainer}
      keyboardVerticalOffset={Header.HEIGHT}>
      <Text
        style={{
          textAlign: 'center',
          height: '100%',
          height: 40,
          fontSize: 20,
          backgroundColor: Link != '' ? '#96ffae' : '#e2e2e2',

          // borderWidth: 2,
        }}
        onPress={() => {
          let meetCode = Math.floor(100000 + Math.random() * 900000);
          meetCode = meetCode.toString().substring(0, 5);
          // if (Link != '') {
          // Alert.alert('clicked');
          joinMeet('https://meet.jit.si/' + meetCode);
          Linking.openURL(Link);
          // }
        }}>
        Initiate a call with patient
      </Text>
      {mode === 'chat' ? (
        <ScrollView>
          <View style={styles.msgs}>
            <ChatBox
              msgsToRender={messages}
              Link={Link}
              typing={typing}
              whoTyping={whoTyping}
            />
            <View style={styles.inputContainer}>
              <TouchableOpacity>
                <Feather name="smile" size={20} color="#7C98B6" />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                color="#7C98B6"
                placeholder="Write a message..."
                value={pvtMsg}
                onChangeText={text => {
                  changeTxtHandler(text);
                }}
              />
              <TouchableOpacity>
                <Ionicon name="attach" size={20} color="#7C98B6" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendMsgHandler();
                  setPvtMsg('');
                }}>
                <Ionicon
                  name="send"
                  size={20}
                  color="#7C98B6"
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : mode === 'video' ? (
        <VideoCallScreen />
      ) : (
        <VoiceCallScreen />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    positon: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    position: 'relative',
    //marginTop: 10,
  },
  msgs: {
    position: 'relative',
    //bottom: 20,
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F5F8FA',
    height: 48,
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#E5E9F0',
    position: 'absolute',
    bottom: 20,
  },
  msgContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  contentContainer: {
    backgroundColor: '#056AD0',
    borderWidth: 1,
    borderColor: '#F5F8FA',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  msgText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  msgContainerUser: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  contentContainerUser: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#DFE3EB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  msgTextUser: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#33475B',
  },

  input: {
    backgroundColor: '#F5F8FA',
    width: '75%',
    marginLeft: 5,
  },
  imgAvatar: {
    marginRight: 5,
  },
  imgAvatarUser: {
    marginLeft: 5,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  btnModal: {
    marginTop: 210,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
  },
  btnModalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  cancelModalText: {},
  cancelModal: {},
});

export default ChatScreen;
