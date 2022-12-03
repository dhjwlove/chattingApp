import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';
import UserPanel from '../components/UserPanel';
import MessagePanel from '../components/MessagePanel';
import './ChatPage.css';

export default function ChatPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);
  const [existingUserList, setExistingUserList] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [selectedUser, setSelectedUser] = useState({});
  const userListRef = useRef([]);

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID !== '') {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on('session', ({ sessionID, userID }) => {
      socket.auth = { sessionID };
      localStorage.setItem('sessionID', sessionID);
      socket.userID = userID;
      setIsConnected(true);
    });

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log(err.message);
        localStorage.setItem('sessionID', '');
        navigate('/loginPage');
      }
    });

    socket.on('users', (users) => {
      users.forEach((user) => {
        for (let i = 0; i < userListRef.current.length; i++) {
          const existUser = userListRef.current[i];
          if (existUser.userID === user.userID) {
            existUser.connected = user.connected;
            return;
          }
        }
        user.self = user.userID === socket.userID;
        user.messages = [];
        user.hasNewMessages = false;
        userListRef.current.push(user);
      });
      setExistingUserList([...userListRef.current]);
    });

    socket.on('user connected', (user) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existUser = userListRef.current[i];
        if (existUser.userID === user.userID) {
          existUser.connected = user.connected;
          return;
        }
      }
      user.messages = [];
      user.hasNewMessages = false;
      userListRef.current.push(user);
      setExistingUserList([...userListRef.current]);
    });

    socket.on('private message', ({ content, from, to }) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const user = userListRef.current[i];
        const fromSelf = socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
          if (user.userID !== selectedUser.userID) {
            user.hasNewMessages = true;
          }

          if (user.userID === selectedUser.userID) {
            setChatList([...user.messages]);
          }
          break;
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('socket disconneted!');
      setIsConnected(false);
    });

    return () => {
      socket.off('session');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('private message');
    };
  }, [selectedUser]);

  useEffect(() => {
    if (userListRef.current.length > 0) {
      const userSelected = userListRef.current.find((user) => user.userID === selectedUser.userID);
      setChatList(userSelected.messages);
    }
  }, [selectedUser]);

  const onTypeHandler = (e) => {
    const text = e.target.value;
    setContent(text);
  };

  const btnClickHandler = () => {
    socket.emit('private message', {
      content,
      to: selectedUser.userID,
    });
    const userSelected = userListRef.current.find((user) => user.userID === selectedUser.userID);
    userSelected.messages.push({ content, fromSelf: true });
    setChatList([...userSelected.messages]);
    setContent('');
  };

  return (
    <div className="ChatPage_Wrapper">
      <div className="LeftPanel">
        <UserPanel
          existingUserList={existingUserList}
          onSelectUser={setSelectedUser}
        />
      </div>
      <div className="RightMsgBox">
        <MessagePanel
          chatList={chatList}
          selectedUser={selectedUser}
          isConnected={isConnected}
          content={content}
          onTypeHandler={onTypeHandler}
          btnClickHandler={btnClickHandler}
        />
      </div>
    </div>
  );
}
