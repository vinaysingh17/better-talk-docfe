import {useEffect, useState} from 'react';
import requestCameraAndAudioPermission from '../components/RequestCameraAudioPermission';
import RtcEngine from 'react-native-agora';

const useEngine = () => {

  //   //4a0f852637d545ac9db1c2dac82b0e67
  const appId = '3cb214e173be4d919267a4d4f2074f32';
  const channelName = 'test';
  const tokenUrl = 'https://reactfeagora.herokuapp.com';
  const token =
    '0063cb214e173be4d919267a4d4f2074f32IABI+I2YHi0XEfqMZQ1qp1j92AL1OhyMyIOLIylaDllpDQx+f9gAAAAAEABUm4+s8C2oYgEAAQDvLahi';

  const [engine, setEngine] = useState(null);

  useEffect(() => {
    console.log('Permission');
    requestCameraAndAudioPermission().then(async () => {
      console.log('requested!');
      setEngine(await RtcEngine.create(appId));
    });
  }, []);

  return engine;
};

export default useEngine;
