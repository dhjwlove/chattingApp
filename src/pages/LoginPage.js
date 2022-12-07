import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import socketAPI from '../lib/socketAPI';
import services from '../services';

export default function LoginPage() {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    // const sessionID = localStorage.getItem('sessionID');
    // if (sessionID !== '') {
    //   // chatPage로 이동하기.
    //   console.log('chat page로 이동!!!');
    //   navigate('/chatPage');
    // }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ', event.target.username.value);
    const username = event.target.username.value;
    await socketAPI.emit('login', { userName: username });
    // services.forEach((service) => service.init(store, socketAPI));
    // navigate('/ChatListPage');
  };

  return (
    <>
      <p>
        Login Page
      </p>
      <div>
        <div>이름 입력</div>
        <form onSubmit={handleSubmit}>
          <input name="username" />
          <button type="submit">name</button>
        </form>
      </div>
    </>
  );
}
