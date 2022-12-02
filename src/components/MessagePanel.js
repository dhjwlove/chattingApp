import React, { useState } from 'react';
import './MessagePanel.css';

export default function MessagePanel({
  selectedUser,
  isConnected,
  chatList,
  content,
  onTypeHandler,
  btnClickHandler,
}) {
  return (
    <div>
      <h1 className="title">ChatPage</h1>
      <div>
        {`소켓연결 ${isConnected}`}
      </div>
      <div>
        {`${selectedUser.username}과의 대화`}
      </div>
      <div>채팅 내용</div>
      {chatList.map((d, i) => {
        const { content, fromSelf } = d;
        return (
          <div className={fromSelf ? 'myText' : 'otherText'} key={`c-${i}`}>
            {content}
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
