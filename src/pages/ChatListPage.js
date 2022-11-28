import React, { useState, useEffect } from 'react';

function ChatList({ data, onClickChatRoom }) {
  return (
    <div onClick={onClickChatRoom}>{data.name}</div>
  );
}

export default function ChatListPage() {
  const [chatList, setChatList] = useState([
    {
      name: 'chat room',
      uuid: 'uuid',
      peoples: ['A', 'B'],
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
