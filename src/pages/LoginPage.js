import React from 'react';

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.username.value);
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
