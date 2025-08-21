// src/pages/SignUp.jsx
import React from 'react';
import '../App.css';

function SignUp() {
  return (
    <div className="container">
      <h1 className="name">회원가입</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        </div>
        <button type="submit" className="login-button">가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
