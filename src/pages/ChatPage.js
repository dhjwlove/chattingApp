import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './ChatPage.css';

const socket = io();
const userKey = Date.now();
console.log('userKey', userKey);

export default function ChatPage() {
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const chatListRef = useRef([]);

  const updateState = (data) => {
    chatListRef.current = [...chatListRef.current, data];
    setChatList(chatListRef.current);
  };

  useEffect(() => {
    socket.on('connection', () => {
      console.log('socket connected!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('socket disconneted!');
      setIsConnected(false);
    });

    socket.on('response_message', (d) => {
      console.log('response_message');
      if (d.userKey !== userKey) {
        console.log('from remote user message:', d.content);
        updateState([d.content, 'otherText']);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const onTypeHandler = (e) => {
    const text = e.target.value;
    setContent(text);
  };

  const btnClickHandler = () => {
    socket.emit('request_message', { userKey, content });
    updateState([content, 'myText']);
    setContent('');
  };

  /**
   * todo
   * 1. 내가 작성한 글은 오른쪽으로 가도록 key를 제공
   * 2. 상대방에게 받은 글은 왼쪽으로 가도록 key 제공
   * 3. socket 연결하기
   * 4. socket을 통해 대화내용 이벤트 발생 시마다 array에 저장하기.
   */
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
