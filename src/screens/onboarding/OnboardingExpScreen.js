import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {TextInput, Button, List} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import {setExperience, setPatients, setQualification} from '../../store/reducers/docReducer';
import {State} from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OnboardingExpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [exp, setExp] = useState('');
  const [showPatientCountDropDown, setshowPatientCountDropDown] =
    useState(false);
  const [location, setLocation] = useState('');
  const [showQualificationDropDown, setshowQualificationDropDown] =
    useState(false);
  const [profession, setProfession] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [patientLocal, setPatientLocal] = useState('');
  const patientcountList = ['10+', '20+', '50+', '100+'];
  const qualificationsList = ['Counsellor', 'Therapist'];
  const name = useSelector(state => state.doc.name);
  return (
    <View style={styles.containerRoot}>
      <ProgressBar
        progress={0.75}
        color="#00BDA5"
        style={{backgroundColor: '#F4FFF6'}}
      />
      <View style={styles.containerMore}>
        <Text style={styles.welcomeText}>
          Tell us about your{' '}
          <Text style={styles.highlightText}>Experience</Text>
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Job Title"
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
          style={styles.nameInput}
          outlineColor="#CCD6E0"
          placeholderTextColor="#85919D"
          maxLength={24}
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
        <TextInput
          mode="outlined"
          placeholder="Your Experience"
          value={exp}
          onChangeText={text => {
            setExp(text);
            setExperience(text);
          }}
          style={styles.nameInput}
          outlineColor="#CCD6E0"
          placeholderTextColor="#85919D"
          maxLength={24}
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
        <SelectDropdown
          data={patientcountList}
          onSelect={(selectedItem, index) => {
            setPatientLocal(selectedItem);
          }}
          defaultButtonText={'Approximate Patient Count'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
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
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <View style={styles.spacerStyle} />
        <SelectDropdown
          data={qualificationsList}
          onSelect={(selectedItem, index) => {
            setSelectedQualification(selectedItem);
          }}
          defaultButtonText={'Qualifications'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
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
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <Text style={styles.noteText}>
          * You can select more than one qualification
        </Text>
        <Button
          mode="contained"
          uppercase={false}
          loading={false}
          onPress={() => {
            navigation.navigate('OnboardingDescribe');
            dispatch(setQualification(selectedQualification));
            dispatch(setPatients(patientLocal));
          }}
          style={styles.btnOnboard}>
          <Text style={styles.btnText}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRoot: {
    flexGrow: 1,
  },
  containerMore: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    postion: 'relative',
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
    marginBottom: 10,
  },
  highlightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 26,
    color: '#056AD0',
  },
  spacerStyle: {
    marginTop: 5,
  },
  btnOnboard: {
    backgroundColor: '#323F4D',
    height: 46,
    borderRadius: 8,
    paddingVertical: 5,
    left: 20,
    width: 320,
    position: 'absolute',
    bottom: 97,
  },
  btnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  noteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 24,
    alignSelf: 'flex-end',
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
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default OnboardingExpScreen;
