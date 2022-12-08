import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketAPI from '../lib/socketAPI';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // todo: userID 스토어에서 가져오고 connect
    // const sessionID = localStorage.getItem('sessionID');
    // if (sessionID !== '') {
    //   // chatPage로 이동하기.
    //   console.log('chat page로 이동!!!');
    //   navigate('/chatPage');
    // }
  }, []);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('username: ', event.target.username.value);
      const username = event.target.username.value;
      const userID = await socketAPI.connect({ userName: username });
      console.log('userID', userID);
      // todo : userID 를 스토어에 저장하기
      // navigate('/ChatListPage');
    } catch (err) {
      if (err.message === 'invalid username') {
        // store.dispatch(setUserID(''));
      }
    }
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
