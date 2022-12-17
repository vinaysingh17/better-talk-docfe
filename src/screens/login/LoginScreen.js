import React from 'react';
import {StyleSheet, View, Text, Dimensions, Alert} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UpdateAvailability} from '../../store/services/services';

const statusList = ['Online', 'Offline'];

const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.subTitle}>Hope you are doing well today</Text>
      <Text style={styles.welcomeText}>Login Status</Text>
      <SelectDropdown
        data={statusList}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, '<<<this is selected');
          if (selectedItem == 'Online') {
            UpdateAvailability(true, res => {
              Alert.alert(res.message);
            });
          }
          if (selectedItem == 'Offline') {
            UpdateAvailability(false, res => {
              Alert.alert(res.message);
            });
          }
        }}
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
      <View style={styles.timerContainer}>
        <Text style={styles.totalTime}>02:35:16</Text>
        <Text style={styles.totalText}>Your total working hours</Text>
      </View>
      <Text style={styles.loginTime}>
        Your login time is from
        <Text style={styles.emphasis}>10:00am - 2:00pm</Text>{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: windowHeight,
    backgroundColor: '#FDFDFD',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  subTitle: {
    fontFamily: 'Inter-Normal',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#33475B',
  },
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 10,
    borderColor: '#CDE1F6',
    alignSelf: 'center',
    marginTop: 40,
  },
  totalTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 32,
    lineHeight: 46,
    color: '#33475B',
  },
  loginTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#85919D',
    marginTop: 20,
  },
  totalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#85919D',
  },
  emphasis: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#5C6C7C',
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
});

export default LoginScreen;
