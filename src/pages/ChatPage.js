import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';
import UserPanel from '../components/UserPanel';
import './ChatPage.css';
import MessagePanel from '../components/MessagePanel';

export default function ChatPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);
  const [existingUserList, setExistingUserList] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [selectedUser, SetSelectedUser] = useState('');
  const chatListRef = useRef([]);
  const userListRef = useRef([]);

  const updateState = (data) => {
    chatListRef.current = [...chatListRef.current, data];
    setChatList(chatListRef.current);
  };

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
        user.message = [];
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
      user.message = [];
      user.hasNewMessages = false;
      setExistingUserList([...userListRef.current, user]);
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
    };
  }, []);

  const onTypeHandler = (e) => {
    const text = e.target.value;
    setContent(text);
  };

  const btnClickHandler = () => {
    socket.emit('private message', {
      content,
      to: selectedUser.userID,
    });
    updateState([content, 'myText']);
    setContent('');
  };

  return (
    <div className="ChatPage_Wrapper">
      <div className="LeftPanel">
        <UserPanel existingUserList={existingUserList} onSelectUser={SetSelectedUser} />
      </div>
      <div className="RightMsgBox">
        <MessagePanel
          chatList={chatList}
          user={selectedUser}
          isConnected={isConnected}
          content={content}
          onTypeHandler={onTypeHandler}
          btnClickHandler={btnClickHandler}
        />
      </div>
    </div>
  );
}
