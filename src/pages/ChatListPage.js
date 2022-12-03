import React, { useState, useEffect } from 'react';

function ChatList({ data, onClickChatRoom }) {
  return (
    <div onClick={onClickChatRoom}>{data.name}</div>
  );
}

export default function ChatListPage() {
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
      <div>
        ChatListPage
      </div>
      <div>
        {chatList.map((d) => <ChatList key={d.name} data={d} onClickChatRoom={onClickHandler} />)}
      </div>
    </>
  );
}
