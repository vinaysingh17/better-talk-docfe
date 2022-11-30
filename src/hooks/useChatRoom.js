import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import socketIOClient from 'socket.io-client';

const NEW_MESSAGE_EVENT = 'private message';

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [whoTyping, setWhoTyping] = useState('');
  const socketRef = useRef();
  const appointmentId = useSelector(state => state.chat.appointmentId);
  const docId = useSelector(state=>state.doc.docId);
  const patientSelected = useSelector(state => state.chat.patientSelected);
  useEffect(() => {
    socketRef.current = socketIOClient('https://socketrahilbe.herokuapp.com/', {
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

    socketRef.current.on('typing', ({isTyping, whoIsTyping}) => {
      setTyping(isTyping);
      setWhoTyping(whoIsTyping);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = messageBody => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
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

  return {messages, typing, whoTyping, sendMessage, sendTyping};
};

export default useChatRoom;
