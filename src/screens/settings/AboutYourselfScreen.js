import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { updateDescriptionAsync } from '../../store/services/docServices';

const windowHeight = Dimensions.get('window').height;

export default function AboutYourselfScreen() {
  const dispatch = useDispatch();
  const descriptionInit = useSelector(state => state.doc.description);
  const docId = useSelector(state => state.doc.docId);
  console.log('docId: ', docId);
  const [text, setText] = useState(descriptionInit);
  return (
    <View style={styles.rootContainer}>
      <TextInput
        mode="outlined"
        placeholder={descriptionInit}
        value={text}
        onChangeText={text => {
          setText(text);
          dispatch(updateDescriptionAsync({id: docId, description: text, dispatch: dispatch}));
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
  },
});
