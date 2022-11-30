import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector,useDispatch } from 'react-redux';
import { updateAboutAsync, updateAgeAsync, updateGenderAsync } from '../../store/services/docServices';
const windowHeight = Dimensions.get('window').height;

export default function GenDetailsScreen() {
  const dispatch = useDispatch();
  const docId = useSelector(state => state.doc.docId);
  console.log('docId: ', docId);
  const [showAgeDropDown, setShowAgeDropDown] = useState(false);
  const genderInit = useSelector(state => state.doc.gender);
  const [gender, setGender] = useState('');
  const [showGenderDropDown, setGenderDropDown] = useState(false);
  const ageInit = useSelector(state => state.doc.age);
  const [age, setAge] = useState(ageInit);
  const aboutInit = useSelector(state => state.doc.about);
  const [about, setAbout] = useState("");
  const genderList = ['Female', 'Male', 'Other'];
  return (
    <View style={styles.rootContainer}>
      <TextInput
        mode="outlined"
        placeholder={ageInit}
        value={age}
        onChangeText={text => {
          setAge(text);
          dispatch(updateAgeAsync({id: docId, age: text, dispatch: dispatch}));
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
        data={genderList}
        onSelect={(selectedItem, index) => {
          dispatch(updateGenderAsync({id: docId, gender: selectedItem, dispatch: dispatch}));
        }}
        defaultButtonText={genderInit}
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
      <TextInput
        mode="outlined"
        placeholder={aboutInit}
        value={about}
        onChangeText={text => {
          setAbout(text);
          dispatch(updateAboutAsync({id: docId, about: text, dispatch: dispatch}));
          }}
        multiline={true}
        numberOfLines={5}
        outlineColor="#CCD6E0"
        style={{
          backgroundColor: '#FBFBFB',
          marginTop: 20,
          color: '#85919D',
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          padding: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 44,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCD6E0',
    marginTop: 7,
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
    marginTop: 5,
  },
});
