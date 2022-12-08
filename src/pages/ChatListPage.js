import React, { useState, useEffect } from 'react';

function ChatList({ data, onClickChatRoom }) {
  return (
    <div onClick={onClickChatRoom}>{data.name}</div>
  );
}

export default function ChatListPage() {
  /**
   * todo: chat 관련 백그라운드 서비스 실행
   * 백그라운드 서비스는 한번만 실행되도록 인스턴스화 하기.
   * 모든 채팅방에서 새롭게 추가되는 메세지를 채팅리스트 별로 표시해 주기.
   * */
  const [chatList, setChatList] = useState([
    {
      name: 'chat room 1',
      peoples: [],
    },
    {
      name: 'chat room 2',
      peoples: [],
    },
    {
      name: 'chat room 3',
      peoples: [],
    },
  ]);

  const onClickHandler = () => {
    console.log('dd');
  };

  return (
    <>
      <h1>
        ChatListPage
      </h1>
      <div>
        {chatList.map((d) => <ChatList key={d.name} data={d} onClickChatRoom={onClickHandler} />)}
      </div>
    </>
  );
}
