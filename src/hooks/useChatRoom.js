import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import socketIOClient from 'socket.io-client';
import {socketbase, STRIX_URL} from '../store/services/docServices';

const NEW_MESSAGE_EVENT = 'private message';

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [Link, setLink] = useState('https://meet.google.com/xmj-zauk-txr');
  const [typing, setTyping] = useState(false);

  const [whoTyping, setWhoTyping] = useState('');
  const socketRef = useRef();
  const appointmentId = useSelector(state => state.chat.appointmentId);
  const docId = useSelector(state => state.doc.docId);
  const patientSelected = useSelector(state => state.chat.patientSelected);
  useEffect(() => {
    // socketRef.current = socketIOClient('https://socketrahilbe.herokuapp.com/', {
    socketRef.current = socketIOClient(socketbase, {
      query: {appointmentId: appointmentId, docId: docId},
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    socketRef.current.on(NEW_MESSAGE_EVENT, ({message, from, to, fromDoc}) => {
      const incomingMessage = {
        message: message,
        from: from,
        to: to,
        fromDoc: fromDoc,
      };
      setMessages(messages => [...messages, incomingMessage]);
    });
    socketRef.current.on('join', ({message, from, to, fromDoc}) => {
      const incomingMessage = {
        message: message,
        from: from,
        to: to,
        fromDoc: fromDoc,
      };
      // setMessages(messages => [...messages, incomingMessage]);
      setLink(message);
    });

    socketRef.current.on('typing', ({isTyping, whoIsTyping}) => {
      setTyping(isTyping);
      setWhoTyping(whoIsTyping);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = messageBody => {
    console.log('message', messageBody);
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      message: messageBody,
      from: docId,
      to: patientSelected,
      fromDoc: true,
    });
  };
  const JoinOnMeet = messageBody => {
    console.log('this is for link', messageBody);
    socketRef.current.emit('join', {
      message: messageBody,
      from: docId,
      to: patientSelected,
      fromDoc: true,
    });
  };

  const sendTyping = temp => {
    socketRef.current.emit('typing', {
      isTyping: temp,
      whoIsTyping: docId,
    });
  };

  return {
    messages,
    typing,
    whoTyping,
    Link,
    sendMessage,
    sendTyping,
    JoinOnMeet,
  };
};

export default useChatRoom;
