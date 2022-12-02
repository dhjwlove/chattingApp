import React, { useState } from 'react';

export default function UserPanel({ existingUserList, onSelectUser }) {
  // console.log('existingUserList:', existingUserList);
  return (
    <>
      <h1>Left Panel</h1>
      {existingUserList.map((user) => (
        <div
          key={user.userID}
          onClick={() => onSelectUser(user)}
        >
          {user.username}
          {user.self === true ? ' (나)' : ''}
          {user.connected ? ' online ' : ' offline'}
        </div>
      ))}
    </>
  );
}
