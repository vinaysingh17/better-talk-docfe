import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button, List} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Header} from '@react-navigation/stack';
import axios from 'axios';
import {setiIsLoggedIn} from '../../store/reducers/docReducer';
import {postDoctorAsync} from '../../store/services/docServices';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingDescribeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const name = useSelector(state => state.doc.name);
  const qualification = useSelector(state => state.doc.qualification);
  const age = useSelector(state => state.doc.age);
  const gender = useSelector(state => state.doc.gender);
  const patients = useSelector(state => state.doc.patients);
  const about = useSelector(state => state.doc.about);
  const experience = useSelector(state => state.doc.experience);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {}, []);

  const tempAvailability = [
    
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
    ],
  ];

  console.log('tempAvailability: ', tempAvailability);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.containerRoot}
      keyboardVerticalOffset={Header.HEIGHT + 20}>
      <ProgressBar
        progress={1}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <ScrollView>
        <View style={styles.containerMedical}>
          <Text style={styles.welcomeText}>
            <Text style={styles.highlightText}>Describe</Text>&nbsp;yourself Dr.{' '}
            {name}.
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Start typing here..."
            value={text}
            onChangeText={text => setText(text)}
            multiline={true}
            numberOfLines={8}
            outlineColor="#CCD6E0"
            style={{
              backgroundColor: '#FBFBFB',
              marginTop: 10,
              color: '#85919D',
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              padding: 0,
            }}
          />
          <Button
            mode="contained"
            uppercase={false}
            loading={false}
            onPress={() => {
              dispatch(setiIsLoggedIn(true));
              dispatch(
                postDoctorAsync({
                  name: name,
                  age: age,
                  gender: gender,
                  about: about,
                  description: text,
                  patients: patients,
                  qualification: qualification,
                  experience: experience,
                  availability: tempAvailability,
                  dispatch: dispatch,
                }),
              );
            }}
            style={styles.btnOnboard}>
            <Text style={styles.btnText}>Next</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flex: 1,
    height: windowHeight,
  },
  containerMedical: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  imgOnboard: {
    width: 200,
    height: 200,
    marginLeft: windowWidth / 2 - 130,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#33475B',
    marginTop: 20,
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  inputStyle: {
    marginTop: 5,
  },
  btnOnboard: {
    width: '100%',
    position: 'absolute',
    bottom: 100,
    left: 15,
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

export default OnboardingDescribeScreen;
