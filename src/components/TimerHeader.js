import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTimer} from 'react-timer-hook';

export default function TimerHeader() {
  const sessionEnd = useSelector(state => state.chat.sessionEnd);
  const docId = useSelector(state => state.doc.docId);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateCallsAsync({id: docId, calls: 1}));
      dispatch(updateSessionsAsync({id: docId, sessions: 1}));
    };
  }, []);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log('expire ');
    },
  });

  return (
    <Text
      style={{
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        lineHeight: 12,
        color: '#85919D',
      }}>
      Running Time-
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          lineHeight: 24,
          color: '#33475B',
        }}>
        {minutes}:{String(seconds).padStart(2, '0')}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({});
