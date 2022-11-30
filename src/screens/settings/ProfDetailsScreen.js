import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  updatePatientsAsync,
  updateQualificationAsync,
  updateExperienceAsync,
} from '../../store/services/docServices';

const windowHeight = Dimensions.get('window').height;

export default function ProfDetailsScreen() {
  const dispatch = useDispatch();
  const docId = useSelector(state => state.doc.docId);
  console.log('docId: ', docId);
  const [showLocationDropDown, setshowLocationDropDown] = useState(false);
  const [location, setLocation] = useState('');
  const [showProfessionDropDown, setShowProfessionDropDown] = useState(false);
  const experienceInit = useSelector(state => state.doc.experience);
  const patients = useSelector(state => state.doc.patients);
  const qualification = useSelector(state => state.doc.qualification);
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState("");
  const patientcountList = ['10+', '20+', '50+', '100+'];
  const qualificationsList = ['Counsellor', 'Therapist'];
  return (
    <View style={styles.rootContainer}>
      <TextInput
        mode="outlined"
        placeholder={experienceInit}
        value={experience}
        onChangeText={text => {
          setExperience(text);
          dispatch(
            updateExperienceAsync({
              id: docId,
              experience: text,
              dispatch: dispatch,
            }),
          );
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
      <View style={styles.spacerStyle} />
      <SelectDropdown
        data={patientcountList}
        onSelect={(selectedItem, index) => {
          dispatch(
            updatePatientsAsync({
              id: docId,
              patients: selectedItem,
              dispatch: dispatch,
            }),
          );
        }}
        defaultButtonText={patients}
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
          dispatch(
            updateQualificationAsync({
              id: docId,
              qualification: selectedItem,
              dispatch: dispatch,
            }),
          );
        }}
        defaultButtonText={qualification}
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
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCD6E0',
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
  spacerStyle: {
    marginTop: 15,
  },
});
