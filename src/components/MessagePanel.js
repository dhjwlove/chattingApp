import React, { useState } from 'react';

export default function MessagePanel({
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
