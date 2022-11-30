import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import login from '../../assets/login.png';
import auth from '@react-native-firebase/auth';
import loginvecgraphic1 from '../../assets/loginvecgraphic1.png';
import loginvecgraphic2 from '../../assets/loginvecgraphic2.png';
import loginvecgraphic3 from '../../assets/loginvecgraphic3.png';
import { useDispatch } from 'react-redux';

const windowHeight = Dimensions.get('window').height;

export default function LoginNumScreen({navigation}) {
  const [confirm, setConfirm] = useState(null);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(text);
    setConfirm(confirmation);
    navigation.navigate('LoginOtp', { number: text,});
  }

  return (
    <View style={styles.rootContainer}>
      <Image source={login} style={styles.loginImg} />
      <Image source={loginvecgraphic1} style={styles.imageBG1} />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Log-in</Text>
        <TextInput
          mode="outlined"
          placeholder="Enter Phone number"
          value={text}
          onChangeText={text => {
            setText(text);
          }}
          style={styles.nameInput}
          outlineColor={'#323F4D'}
          placeholderTextColor="#85919D"
          maxLength={10}
          keyboardType={"number-pad"}
          style={{
            backgroundColor: '#FBFBFB',
            height: 44,
            marginTop: 10,
            color: '#85919D',
            fontFamily: 'Inter-Regular',
            lineHeight: 24,
            fontSize: 14,
          }}
        />

        <Button
          mode="contained"
          uppercase={false}
          loading={false}
          onPress={() => navigation.navigate('LoginOtp', { number: text,})}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Send OTP</Text>
        </Button>
      </View>
      <Image source={loginvecgraphic2} style={styles.imageBG2} />
      <Image source={loginvecgraphic3} style={styles.imageBG3} />
      {/* <View style={styles.signupText}>
        <Text style={styles.accSign}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
           // signInWithPhoneNumber();
           navigation.navigate('Signup');
          }}
          style={styles.touch}>
          <Text style={styles.highlightText}>Signup</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  loginImg: {
    marginTop: 30,
    alignSelf: 'center',
  },
  imageBG1: {
    width: 280,
    height: 280,
    position: 'absolute',
    left: -10,
    top: 220,
  },
  imageBG2: {
    width: 200,
    height: 250,
    position: 'absolute',
    right: -25,
    top: 400,
  },
  imageBG3: {
    width: 200,
    height: 250,
    position: 'absolute',
    right: -25,
    top: 400,
  },
  contentContainer: {
    position: 'absolute',
    top: 240,
    width: '100%',
    left: 15,
  },
  header: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    lineHeight: 36,
    color: '#33475B',
  },
  signupText: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  accSign: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#85919D',
  },
  highlightText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 28,
    color: '#056AD0',
    marginLeft: 4,
  },
  nameInput: {
    marginTop: 20,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnOnboard: {
    marginTop: 20,
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
});
