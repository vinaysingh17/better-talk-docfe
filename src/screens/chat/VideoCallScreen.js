import React, {useState, useEffect} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function VideoCallScreen({navigation}) {
  const [videoCall, setVideoCall] = useState(true);
  const appointmentId = useSelector(state => state.chat.appointmentId);
  //   //4a0f852637d545ac9db1c2dac82b0e67
  const connectionData = {
    appId: '3cb214e173be4d919267a4d4f2074f32',
    channel: appointmentId,
    tokenUrl: 'https://reactfeagora.herokuapp.com',
  };

  useEffect(() => {}, [videoCall]);
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  // return (
  //   videoCall && (
  //     <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  //   )
  // );
}
