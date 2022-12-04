import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // const sessionID = localStorage.getItem('sessionID');
    // if (sessionID !== '') {
    //   // chatPage로 이동하기.
    //   console.log('chat page로 이동!!!');
    //   navigate('/chatPage');
    // }
  }, []);
  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log('username: ', event.target.username.value);
    // const username = event.target.username.value;
    // socket.auth = { username };
    // socket.connect();
    // navigate('/chatPage');
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
