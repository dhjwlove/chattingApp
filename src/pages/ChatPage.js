import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ChatPage.css';

const socket = io();
const userKey = Date.now();
console.log('userKey', userKey);

export default function ChatPage() {
  const [content, setContent] = useState('');
  const [chatList, setChatList] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('socket 연결됨!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('socket 연결 끊어짐!');
      setIsConnected(false);
    });

    socket.on('message', (d) => {
      console.log('메세지 받았당', d);
      console.log('user키가 같나? ', d.userKey === userKey);
      if (d.userKey !== userKey) {
        setChatList([...chatList, d.content]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [chatList]);

  const onTypeHandler = (e) => {
    const text = e.target.value;
    setContent(text);
  };

  const btnClickHandler = () => {
    socket.emit('message', { userKey, content });
    setChatList([...chatList, content]);
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
      {chatList.map((d, i) => (
        <div key={`c-${i}`}>
          {d}
        </div>
      ))}

      <div>내용 입력</div>
      <div>
        <input value={content} onChange={onTypeHandler} />
        <button type="button" onClick={btnClickHandler}>입력</button>
      </div>
    </div>
  );
}
