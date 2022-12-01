import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';
import './ChatPage.css';

export default function ChatPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const chatListRef = useRef([]);

  const updateState = (data) => {
    chatListRef.current = [...chatListRef.current, data];
    setChatList(chatListRef.current);
  };

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');
    console.log('sessionID', sessionID);

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
        for (let i = 0; i < activeUsers.length; i++) {
          const activeUser = activeUsers[i];
          if (activeUser.userID === user.userID) {
            activeUser.connected = user.connected;
            break;
          }
        }
        user.self = user.userID === socket.userID;
        user.message = [];
        user.hasNewMessages = false;
        setActiveUsers([...activeUsers, user]);
      });
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
    // socket.emit('request_message', { userKey, content });
    // updateState([content, 'myText']);
    // setContent('');
  };

  return (
    <div>
      <h1 className="title">ChatPage</h1>
      <div>
        {`소켓연결 ${isConnected}`}
      </div>
      <div>채팅 내용</div>
      {chatList.map((d, i) => {
        const [text, styleName] = d;
        return (
          <div className={styleName} key={`c-${i}`}>
            {text}
          </div>
        );
      })}

      <div>내용 입력</div>
      <div>
        <input value={content} onChange={onTypeHandler} />
        <button type="button" onClick={btnClickHandler}>입력</button>
      </div>
    </div>
  );
}
