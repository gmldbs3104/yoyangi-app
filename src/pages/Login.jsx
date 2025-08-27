// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();

  // 3. 폼(form)이 제출될 때 실행될 함수를 만듭니다.
  const handleLogin = (event) => {
    // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
    event.preventDefault(); 
    console.log("로그인 시도!");
    navigate('/test-start');
  };

  return (
    <div className="container">
      <h1 className="name">로그인</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" placeholder="아이디를 입력하세요" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        </div>

        <button type="submit" className="login-button">로그인</button>
      </form>

      <button
        onClick={() => navigate('/signup')}
        className="secondary-action-link">
          회원이 아니신가요? 회원가입
        </button>
    </div>
  );
}

export default Login;
